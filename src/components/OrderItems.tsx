import { Dispatch, SetStateAction, useState } from "react";
import "../styles/orderitems.css";
import { IStore } from "../interfaces/userContextInterfaces";

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
        {currentStore.products.map((product) => (
          <div>{product.name}</div>
        ))}
        {loading ? <h1>LOADING...</h1> : null}
        <button className="modalBtn">Save</button>
      </div>
    </div>
  );
}

export default OrderItems;
