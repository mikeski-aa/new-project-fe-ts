import { Dispatch, SetStateAction } from "react";
import { INewItem } from "../interfaces/storeInterfaces";
import { IStore } from "../interfaces/userContextInterfaces";

// validate vs whole store items
function validateStoreSkus(
  currentStore: IStore,
  sku: string,
  setSkuDuplicate: Dispatch<SetStateAction<boolean>>
): void {
  // checks for duplicate SKU in store items!
  const productsCopy = [...currentStore.products];
  const filtered = productsCopy.filter((product) => product.sku === sku);
  console.log(filtered.length);

  if (filtered.length > 0) {
    return setSkuDuplicate(true);
  } else {
    return setSkuDuplicate(false);
  }
}

// validate vs new items
function validateNewSkus(
  newItems: INewItem[],
  sku: string,
  setSkuDuplicate: Dispatch<SetStateAction<boolean>>
): void {
  const newItemsCopy = [...newItems];
  const filteredItems = newItemsCopy.filter((product) => product.sku === sku);
  console.log(filteredItems.length);

  if (filteredItems.length > 0) {
    return setSkuDuplicate(true);
  } else {
    return setSkuDuplicate(false);
  }
}

function validateInputSku(
  sku: string,
  setSkuError: Dispatch<SetStateAction<boolean>>
): void {
  if (sku.length != 6) {
    setSkuError(true);
  } else {
    setSkuError(false);
  }
}

function validateInputName(
  name: string,
  setNameError: Dispatch<SetStateAction<boolean>>
): void {
  if (name.length === 0) {
    setNameError(true);
  } else {
    setNameError(false);
  }
}
function validateInputType(
  type: string,
  setTypeError: Dispatch<SetStateAction<boolean>>
): void {
  if (type.length === 0) {
    setTypeError(true);
  } else {
    setTypeError(false);
  }
}

function validateInputPrice(
  price: number,
  setPriceError: Dispatch<SetStateAction<boolean>>
): void {
  if (price == 0) {
    setPriceError(true);
  } else {
    setPriceError(false);
  }
}

export {
  validateNewSkus,
  validateStoreSkus,
  validateInputName,
  validateInputPrice,
  validateInputSku,
  validateInputType,
};
