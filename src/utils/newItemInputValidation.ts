import { Dispatch, SetStateAction } from "react";
import { INewItem } from "../interfaces/storeInterfaces";
import { IStore } from "../interfaces/userContextInterfaces";

// validate vs whole store items
function validateStoreSkus(
  currentStore: IStore,
  sku: string,
  setSkuDuplicate: Dispatch<SetStateAction<boolean>>
): boolean {
  // checks for duplicate SKU in store items!
  const productsCopy = [...currentStore.products];
  const filtered = productsCopy.filter((product) => product.sku === sku);
  console.log(filtered.length);

  if (filtered.length > 0) {
    setSkuDuplicate(true);
    return true;
  } else {
    setSkuDuplicate(false);
    return false;
  }
}

// validate vs new items
function validateNewSkus(
  newItems: INewItem[],
  sku: string,
  setSkuDuplicate: Dispatch<SetStateAction<boolean>>
): boolean {
  const newItemsCopy = [...newItems];
  const filteredItems = newItemsCopy.filter((product) => product.sku === sku);
  console.log(filteredItems.length);

  if (filteredItems.length > 0) {
    setSkuDuplicate(true);
    return true;
  } else {
    setSkuDuplicate(false);
    return false;
  }
}

function validateInputSku(sku: string): boolean {
  if (sku.length != 6) {
    return true;
  } else {
    return false;
  }
}

function validateInputName(name: string): boolean {
  if (name.length === 0) {
    return true;
  } else {
    return false;
  }
}
function validateInputType(type: string): boolean {
  if (type.length === 0) {
    return true;
  } else {
    return false;
  }
}

function validateInputPrice(price: number): boolean {
  if (price == 0) {
    return true;
  } else {
    return false;
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
