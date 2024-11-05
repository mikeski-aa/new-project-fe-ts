import { Dispatch, SetStateAction } from "react";
import { IProduct, ISoldProduct } from "../interfaces/userContextInterfaces";

function updateSoldItems(
  itemsSold: ISoldProduct[],
  item: ISoldProduct,
  newValue: number,
  setItemsSold: Dispatch<SetStateAction<ISoldProduct[]>>
): void {
  // need to update items sold with new quantity too
  const shallowCopyItemsSold = [...itemsSold];

  shallowCopyItemsSold.map((copyItem) =>
    copyItem.sku === item.sku ? (copyItem.quantitySold = newValue) : copyItem
  );

  setItemsSold(shallowCopyItemsSold);
}

function filterProducts(products: IProduct[]) {
  const filteredProducts = products.filter((item) => item.quantity != 0);

  return filteredProducts;
}

export { updateSoldItems, filterProducts };
