import { useNavigate } from "react-router-dom";
import { IStore } from "../interfaces/userContextInterfaces";
import "../styles/storeholder.css";
import IndividualProduct from "./IndividualProduct";
import { useState } from "react";

function StoreHolder({ store }: { store: IStore }) {
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenClick = () => {
    navigate(`/store/${store.id}`);
  };

  const handleDeleteClick = () => {
    setModal(true);
  };

  return (
    <div className="storeContainer">
      <div className={modal ? "deletemodal show" : "deletemodal hide"}>
        <div className="deleteConfirmContainer">
          <button className="delModBtn">Confirm Delete</button>
          <button className="delModBtn">Cancel</button>
        </div>
      </div>
      <div className="budgetHeading">{store.name}</div>
      <img src={store.picture} className="storePicture"></img>
      <div className="budgetValue">{store.location}</div>
      <div className="productHolder">
        Unique products in store:{" "}
        {store.products ? store.products.length : null}
      </div>
      <div className="storeButtons">
        <button className="storeBtn" onClick={handleOpenClick}>
          Open
        </button>
        <button className="storeBtn">Edit</button>
        <button className="storeBtn" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default StoreHolder;
