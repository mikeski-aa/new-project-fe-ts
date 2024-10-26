import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import "../styles/additemstockmodal.css";
import { INewItem } from "../interfaces/storeInterfaces";
import NewItemInModal from "./NewItemInModal";
import { IStore } from "../interfaces/userContextInterfaces";

function AddItemStockModal({
  modal,
  setModal,
  currentStore,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  currentStore: IStore;
}) {
  const [newItems, setNewItems] = useState<INewItem[]>([]);
  const [sku, setSku] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [skuError, setSkuError] = useState<boolean>(false);
  const [skuDuplicate, setSkuDuplicate] = useState<boolean>(false);

  const handleModalClose = () => {
    setModal(false);
  };

  // needs to validate inputs first before submitting
  // check for unique SKU -> this is to prevent same SKU being added multiple times by accident
  // need to check new items are also all unique with eachother
  // also no empty inputs allowed on name, type price or quantity.

  const handleAddItem = (): void => {
    // checks for duplicate SKU in store items!
    const productsCopy = [...currentStore.products];
    const filtered = productsCopy.filter((product) => product.sku === sku);
    console.log(filtered.length);

    if (filtered.length > 0) {
      return setSkuDuplicate(true);
    } else {
      setSkuDuplicate(false);
    }

    const newItemsCopy = [...newItems];
    const filteredItems = newItemsCopy.filter((product) => product.sku === sku);
    console.log(filteredItems.length);

    if (filteredItems.length > 0) {
      return setSkuDuplicate(true);
    } else {
      setSkuDuplicate(false);
    }

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
              <NewItemInModal
                key={index}
                item={item}
                state={newItems}
                setState={setNewItems}
              />
            ))}
          </div>
          <hr></hr>
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
          <div
            className={
              skuDuplicate ? "duplicateError show" : "duplicateError hide"
            }
          >
            Error div
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemStockModal;
