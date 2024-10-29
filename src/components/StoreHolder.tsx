import { useNavigate } from "react-router-dom";
import { IStore } from "../interfaces/userContextInterfaces";
import "../styles/storeholder.css";
import { useState } from "react";
import ConfirmDeleteBox from "./ConfirmDeleteBox";
import EditShopModal from "./EditShopModal";

function StoreHolder({ store }: { store: IStore }) {
  const [modal, setModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleOpenClick = () => {
    navigate(`/store/${store.id}`);
  };

  const handleDeleteClick = () => {
    setModal(true);
  };

  const handleEditClick = () => {
    setEditModal(true);
  };

  // is using useContext for a single instance of passing the props two depths down worth it?
  return (
    <div className="storeContainer">
      <ConfirmDeleteBox modal={modal} setModal={setModal} store={store} />
      <EditShopModal modal={editModal} setModal={setEditModal} store={store} />
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
        <button className="storeBtn" onClick={handleEditClick}>
          Edit
        </button>
        <button className="storeBtn" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default StoreHolder;
