import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../styles/orderitems.css";
import { IProduct, IStore } from "../interfaces/userContextInterfaces";
import IndividualOrderItem from "./IndividualOrderItem";
import { createOrder } from "../services/orderCalls";

function OrderItems({
  modal,
  setModal,
  currentStore,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  currentStore: IStore;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [copyProducts, setCopyProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const shallowCopy = [...currentStore.products];
    const deepCopy = shallowCopy.map((product) => ({
      ...product,
      quantity: 0,
    }));
    setCopyProducts(deepCopy);
  }, [currentStore.products]);

  const handleCloseClick = () => {
    setModal(false);
  };

  const handleOrderClick = async () => {
    setLoading(true);
    await createOrder(copyProducts);
    setLoading(false);
    setModal(false);
  };

  return (
    <div className={modal ? "newOrderItems show" : "newOrderItems hide"}>
      <div className="orderNewItemContainer">
        <div className="modalBtnContainer"></div>
        <div className="orderItemText">Order items</div>
        {copyProducts.map((product, index) => (
          <IndividualOrderItem
            item={product}
            key={index}
            copyProducts={copyProducts}
            setCopyProducts={setCopyProducts}
          />
        ))}
        {loading ? <h1>LOADING...</h1> : null}
        <div className="buttonContainerNewOrderModal">
          <button className="modalBtn" onClick={handleOrderClick}>
            Order items
          </button>
          <button className="modalBtn close" onClick={handleCloseClick}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderItems;
