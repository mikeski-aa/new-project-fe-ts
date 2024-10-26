import { Dispatch, SetStateAction } from "react";
import "../styles/additemstockmodal.css";

function AddItemStockModal({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const handleModalClose = () => {
    setModal(false);
  };
  return (
    <div className={modal ? "newItemModal show" : "newItemModal hide"}>
      <div className="newItemContainer">
        <button className="newItemModalBtn" onClick={handleModalClose}>
          Close
        </button>
        <div className="newItemBoxes"></div>
      </div>
    </div>
  );
}

export default AddItemStockModal;
