import "../styles/finance.css";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { getOrdersForStore } from "../services/orderCalls";
import { IStore } from "../interfaces/userContextInterfaces";
import OrderItemComponent from "../components/OrderItemComponent";

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

  useEffect(() => {
    console.log(userContext.stores);
    if (userContext && userContext.stores.length != 0) {
      setActiveStore(userContext.stores[0].name);
    }
  }, [userContext.stores]);

  const handleStoreClick = async (id: number, name: string) => {
    setActiveStore(name);
    const orders = await getOrdersForStore(id);
    setActiveOrders(orders);
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
          {activeOrders
            ? activeOrders.map((order, index) => (
                <OrderItemComponent
                  key={index}
                  date={order.date}
                  total={order.totalvalue}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Finance;
