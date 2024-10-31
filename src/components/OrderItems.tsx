import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../styles/orderitems.css";
import { IProduct, IStore } from "../interfaces/userContextInterfaces";
import IndividualOrderItem from "./IndividualOrderItem";

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
    setCopyProducts(shallowCopy);
  }, [currentStore.products]);

  const handleCloseClick = () => {
    setModal(false);
  };

  return (
    <div className={modal ? "newOrderItems show" : "newOrderItems hide"}>
      <div className="orderNewItemContainer">
        <div className="modalBtnContainer">
          <button className="modalBtn" onClick={handleCloseClick}>
            Close
          </button>
        </div>
        <div className="orderItemText">Order items</div>
        {currentStore.products.map((product, index) => (
          <IndividualOrderItem
            item={product}
            key={index}
            copyProducts={copyProducts}
            setCopyProducts={setCopyProducts}
          />
        ))}
        {loading ? <h1>LOADING...</h1> : null}
        <button className="modalBtn">Save</button>
      </div>
    </div>
  );
}

export default OrderItems;
