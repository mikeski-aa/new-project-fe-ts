import { Dispatch, SetStateAction, useState } from "react";
import "../styles/additemstockmodal.css";

function AddItemStockModal({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  interface INewItem {
    sku: string;
    name: string;
    type: string;
    price: number;
    quantity: number;
  }

  const [newItems, setNewItems] = useState<INewItem[]>([]);

  const handleModalClose = () => {
    setModal(false);
  };
  return (
    <div className={modal ? "newItemModal show" : "newItemModal hide"}>
      <div className="newItemContainer">
        <button className="newItemModalBtn" onClick={handleModalClose}>
          Close
        </button>
        <div className="newItemBoxes">
          <div className="addedItemContainer">
            <div className="headingItems">Added items</div>
          </div>
          <div className="newItemInputContainer">
            <input className="newItemInput" placeholder="SKU"></input>
            <input className="newItemInput" placeholder="Item name"></input>
            <input className="newItemInput" placeholder="Item type"></input>
            <input className="newItemInput" placeholder="Item price"></input>
            <input
              className="newItemInput"
              placeholder="Stock quantity"
            ></input>
            <button className="newItemAddBtn">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemStockModal;
