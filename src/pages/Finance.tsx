import "../styles/finance.css";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { getOrdersForStore } from "../services/orderCalls";
import { IReport, IStore } from "../interfaces/userContextInterfaces";
import OrderItemComponent from "../components/OrderItemComponent";
import { getRepData } from "../services/reportCalls";

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
      console.log(userContext.stores);
      if (userContext && userContext.stores.length != 0) {
        setActiveStore(userContext.stores[0].name);
        const data = await getRepData(userContext.stores[0].id);
        if (data.multipleItems) {
          setActiveReports(data.multipleItems);
        }

        console.log(data);
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
    console.log(data);
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
          <h4>Past orders</h4>
          <div className="totalValueForOrders">
            Total value of orders ${getTotalValue()}
          </div>
          <div className="totalValueForOrders">
            Total income from reports ${getTotalRepValue()}
          </div>
          {activeOrders ? (
            activeOrders.length ? (
              activeOrders.map((order, index) => (
                <OrderItemComponent
                  key={index}
                  date={order.date}
                  total={order.totalvalue}
                  orderItems={order.itemsordered}
                />
              ))
            ) : (
              <div>No items to show</div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Finance;
