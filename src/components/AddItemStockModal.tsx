import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import "../styles/additemstockmodal.css";
import { INewItem } from "../interfaces/storeInterfaces";
import NewItemInModal from "./NewItemInModal";

function AddItemStockModal({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [newItems, setNewItems] = useState<INewItem[]>([]);
  const [sku, setSku] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [skuError, setSkuError] = useState<boolean>(false);

  const handleModalClose = () => {
    setModal(false);
  };

  // needs to validate inputs first before submitting
  const handleAddItem = () => {
    if (!skuError) {
      setSku("");
      setName("");
      setType("");
      setPrice(0);
      setQuantity(0);
      const newItem: INewItem = {
        sku: sku,
        name: name,
        type: type,
        price: price,
        quantity: quantity,
      };
      setNewItems([...newItems, newItem]);
    }
  };

  // inputhanlders for each individual field
  const handleInput = (e: SyntheticEvent, name: string) => {
    const target = e.target as HTMLInputElement;

    if (name === "sku") {
      const regex = /^[A-Z]{3}\d{3}$/;
      const isValid = regex.test(target.value.toUpperCase());

      if (!isValid) {
        setSkuError(true);
      } else {
        setSkuError(false);
      }

      setSku(target.value.toUpperCase());
    } else if (name === "name") {
      setName(target.value);
    } else if (name === "type") {
      setType(target.value);
    } else if (name === "price") {
      setPrice(+target.value);
    } else if (name === "quantity") {
      setQuantity(+target.value);
    }
  };
  return (
    <div className={modal ? "newItemModal show" : "newItemModal hide"}>
      <div className="newItemContainer">
        <button className="newItemModalBtn" onClick={handleModalClose}>
          Close
        </button>
        <button className="nweItemModalBtn">Save</button>
        <div className="newItemBoxes">
          <div className="addedItemContainer">
            <div className="headingItems">Added items</div>
            <div className="headingDivs">
              <div className="headingDivItem">SKU</div>
              <div className="headingDivItem">Name</div>
              <div className="headingDivItem">Type</div>
              <div className="headingDivItem">Price</div>
              <div className="headingDivItem">Quantity</div>
            </div>
            <hr></hr>
            {newItems.map((item, index) => (
              <NewItemInModal key={index} item={item} />
            ))}
          </div>
          <div className="newItemInputContainer">
            <div className="inputContainer">
              <input
                className="newItemInput"
                placeholder="SKU"
                value={sku}
                type="string"
                onChange={(e) => handleInput(e, "sku")}
                maxLength={6}
                minLength={6}
              ></input>
              <div
                className={
                  skuError ? "inputErrorSKU show" : "inputErrorSKU hide"
                }
              >{`SKU must be 'AAA000' format!`}</div>
            </div>
            <div className="inputContainer">
              <input
                className="newItemInput"
                placeholder="Item name"
                value={name}
                type="string"
                maxLength={30}
                minLength={1}
                onChange={(e) => handleInput(e, "name")}
              ></input>
            </div>
            <div className="inputContainer">
              <input
                className="newItemInput"
                placeholder="Item type"
                value={type}
                type="string"
                onChange={(e) => handleInput(e, "type")}
                maxLength={30}
                minLength={1}
              ></input>
            </div>
            <div className="inputContainer">
              <input
                className="newItemInput"
                placeholder="Item price"
                value={price}
                type="number"
                onChange={(e) => handleInput(e, "price")}
                maxLength={30}
                minLength={1}
              ></input>
            </div>
            <div className="inputContainer">
              <input
                className="newItemInput"
                placeholder="Stock quantity"
                type="number"
                value={quantity}
                onChange={(e) => handleInput(e, "quantity")}
                maxLength={30}
                minLength={1}
              ></input>
            </div>
            <button className="newItemAddBtn" onClick={handleAddItem}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemStockModal;
