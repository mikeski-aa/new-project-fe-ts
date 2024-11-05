import "../styles/finance.css";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { getOrdersForStore } from "../services/orderCalls";
import { IReport } from "../interfaces/userContextInterfaces";
import OrderItemComponent from "../components/OrderItemComponent";
import { getRepData } from "../services/reportCalls";
import ReportItemComponent from "../components/ReportItemComponent";

export interface IOrderItem {
  id: number;
  orderId: number;
  quantityordered: number;
  sku: string;
}

export interface IOrder {
  id: number;
  storeId: number;
  date: Date;
  totalvalue: number;
  itemsordered: IOrderItem[];
}

function Finance() {
  const userContext = useContext(UserContext);
  const [activeStore, setActiveStore] = useState<string>("");
  const [activeOrders, setActiveOrders] = useState<IOrder[]>();
  const [activeReports, setActiveReports] = useState<IReport[]>([]);

  // i need to fetch the report data too
  useEffect(() => {
    const populateFinance = async () => {
      if (userContext && userContext.stores.length != 0) {
        setActiveStore(userContext.stores[0].name);

        const orders = await getOrdersForStore(userContext.stores[0].id);
        setActiveOrders(orders);

        const data = await getRepData(userContext.stores[0].id);

        if (data.multipleItems) {
          setActiveReports(data.multipleItems);
        }
      }
    };
    populateFinance();
  }, [userContext.stores]);

  const handleStoreClick = async (id: number, name: string) => {
    setActiveStore(name);
    const orders = await getOrdersForStore(id);
    setActiveOrders(orders);
    const data = await getRepData(id);
    if (data.multipleItems) {
      setActiveReports(data.multipleItems);
    }
  };

  const getTotalValue = () => {
    let total = 0;
    if (activeOrders) {
      for (let x = 0; x < activeOrders.length; x++) {
        total += activeOrders[x].totalvalue;
      }
    }
    return total;
  };

  const getTotalRepValue = () => {
    let total = 0;
    if (activeReports) {
      for (let x = 0; x < activeReports.length; x++) {
        total += activeReports[x].totalSaleValue;
      }
    }
    return total;
  };

  return (
    <div className="financeContainer">
      <div className="something">
        <h1>Finance</h1>
        <div className="buttonHolder">
          {userContext.stores ? (
            userContext.stores.length < 1 ? (
              <div>No reports to display</div>
            ) : null
          ) : null}
          {userContext
            ? userContext?.stores.map((store, index) => (
                <button
                  key={index}
                  className={
                    activeStore === store.name
                      ? `finStoreBtn active`
                      : `finStoreBtn`
                  }
                  onClick={() => handleStoreClick(store.id, store.name)}
                >
                  {store.name}
                </button>
              ))
            : null}
        </div>
        <div className="reportHolder">
          {activeOrders ? (
            activeOrders.length || activeReports.length ? (
              <div className="orderReportHolder">
                <div className="totalValueForOrders">
                  Total value of orders $
                  {Math.round(getTotalValue() * 100) / 100}
                </div>
                <div className="totalValueForOrders">
                  Total income from reports $
                  {Math.round(getTotalRepValue() * 100) / 100}
                </div>
                <div className="totalValueForOrder">
                  Current net of orders v.s sales: $
                  {Math.round((getTotalRepValue() - getTotalValue()) * 100) /
                    100}
                </div>
                <div className="sideBySide">
                  <div
                    className={
                      activeOrders.length === 0
                        ? "orderHolderVert hide"
                        : "orderHolderVert"
                    }
                  >
                    <h4>Past stock orders</h4>
                    <div className="headingHolderRep">
                      <div className="reportItemText">Date</div>
                      <div className="reportItemText">Total value</div>
                    </div>
                    {activeOrders.map((order, index) => (
                      <OrderItemComponent
                        key={index}
                        date={order.date}
                        total={order.totalvalue}
                        orderItems={order.itemsordered}
                      />
                    ))}
                  </div>
                  <div
                    className={
                      activeReports.length === 0
                        ? "reportHolderVert hide"
                        : "reportHolderVert"
                    }
                  >
                    <h4>Past sale reports</h4>
                    <div className="headingHolderRep">
                      <div className="reportItemText">Date</div>
                      <div className="reportItemText">Total value</div>
                    </div>
                    {activeReports.map((item, index) => (
                      <ReportItemComponent report={item} key={index} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>This store has no stock orders or sale reports </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Finance;
