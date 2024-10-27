import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import "../styles/additemstockmodal.css";
import { INewItem } from "../interfaces/storeInterfaces";
import NewItemInModal from "./NewItemInModal";
import { IStore } from "../interfaces/userContextInterfaces";
import {
  validateInputName,
  validateInputPrice,
  validateInputSku,
  validateInputType,
  validateNewSkus,
  validateStoreSkus,
} from "../utils/newItemInputValidation";
import { addProducts } from "../services/productCalls";

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
  const [skuFormatError, setSkuFormatError] = useState<boolean>(false);
  const [skuDuplicate, setSkuDuplicate] = useState<boolean>(false);
  const [skuDuplicateCurrent, setSkuDuplicateCurrent] =
    useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [typeError, setTypeError] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleModalClose = () => {
    setModal(false);
  };

  const resetItem = () => {
    setSku("");
    setName("");
    setType("");
    setPrice(0);
    setQuantity(0);
  };

  // needs to validate inputs first before submitting
  // check for unique SKU -> this is to prevent same SKU being added multiple times by accident
  // need to check new items are also all unique with eachother
  // also no empty inputs allowed on name, type price or quantity.

  const handleAddItem = (): void => {
    console.log("hello");
    const validatedInputs =
      validateInputName(name) ||
      validateInputSku(sku) ||
      validateInputType(type) ||
      validateInputPrice(price);

    const validatedSkus = skuError || skuDuplicate || skuDuplicateCurrent;
    if (!validatedInputs && !validatedSkus) {
      const newItem: INewItem = {
        sku: sku,
        name: name,
        type: type,
        price: price,
        quantity: quantity,
        storeId: currentStore.id,
      };
      console.log(newItem);
      setNewItems([...newItems, newItem]);
      resetItem();
      return;
    } else {
      validateInputName(name) ? setNameError(true) : setNameError(false);
      validateInputType(type) ? setTypeError(true) : setTypeError(false);
      validateInputPrice(price) ? setPriceError(true) : setPriceError(false);
      validateInputName(sku) ? setSkuError(true) : setSkuError(false);
    }
  };

  // inputhanlders for each individual field
  const handleInput = (e: SyntheticEvent, name: string) => {
    const target = e.target as HTMLInputElement;

    if (name === "sku") {
      setSku(target.value.toUpperCase());

      if (target.value.length < 6 || target.value.length >= 8) {
        setSkuError(true);
      } else {
        setSkuError(false);
      }

      // checks for duplicate SKU in store items!
      validateStoreSkus(
        currentStore,
        target.value.toUpperCase(),
        setSkuDuplicateCurrent
      );

      // check for duplicated in new items.
      validateNewSkus(newItems, target.value.toUpperCase(), setSkuDuplicate);
    } else if (name === "name") {
      setName(target.value);
      if (validateInputName(target.value)) {
        return setNameError(true);
      }

      setNameError(false);
    } else if (name === "type") {
      setType(target.value);
      if (validateInputType(target.value)) {
        return setTypeError(true);
      }
      setTypeError(false);
    } else if (name === "price") {
      setPrice(+target.value);
      if (validateInputPrice(+target.value)) {
        return setPriceError(true);
      }
      setPriceError(false);
    } else if (name === "quantity") {
      setQuantity(+target.value);
    }
  };

  const handleSaveAction = async () => {
    if (newItems.length === 0) {
      return false;
    }

    console.log(newItems);
    const response = await addProducts(currentStore.id, newItems);

    console.log(response);
  };

  return (
    <div className={modal ? "newItemModal show" : "newItemModal hide"}>
      <div className="newItemContainer">
        <button className="newItemModalBtn" onClick={handleModalClose}>
          Close
        </button>
        <button className="nweItemModalBtn" onClick={handleSaveAction}>
          Save
        </button>
        {loading ? <h1>LOADING...</h1> : null}
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
                maxLength={7}
                minLength={6}
              ></input>
              <div
                className={
                  skuError ? "inputErrorNewItem show" : "inputErrorNewItem hide"
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
              <div
                className={
                  nameError
                    ? "inputErrorNewItem show"
                    : "inputErrorNewItem hide"
                }
              >{`Name required`}</div>
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
              <div
                className={
                  typeError
                    ? "inputErrorNewItem show"
                    : "inputErrorNewItem hide"
                }
              >{`Type required`}</div>
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
              <div
                className={
                  priceError
                    ? "inputErrorNewItem show"
                    : "inputErrorNewItem hide"
                }
              >{`Price required`}</div>
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
              skuDuplicate || skuDuplicateCurrent
                ? "duplicateError show"
                : "duplicateError hide"
            }
          >
            This SKU already exists in this store!
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemStockModal;
