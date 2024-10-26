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

function validateInputLength() {}

export { validateInputLength, validateNewSkus, validateStoreSkus };
