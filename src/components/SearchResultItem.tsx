import { Dispatch, SetStateAction } from "react";
import { INewItem } from "../interfaces/storeInterfaces";
import { IProduct, ISoldProduct } from "../interfaces/userContextInterfaces";

function SearchResultItem({
  item,
  itemsSold,
  setItemsSold,
  currentItems,
  setCurrentItems,
}: {
  item: IProduct;
  itemsSold: ISoldProduct[];
  setItemsSold: Dispatch<SetStateAction<ISoldProduct[]>>;
  currentItems: IProduct[];
  setCurrentItems: Dispatch<SetStateAction<IProduct[]>>;
}) {
  // add item to list of sold items
  // remove items from search list
  // add a new field called quantitySold to new item
  const handleAddClick = () => {
    const currentCopy = [...currentItems];
    const filteredItems = currentCopy.filter(
      (filItem) => filItem.sku != item.sku
    );
    console.log(filteredItems);
    setCurrentItems(filteredItems);

    const soldItemChanged: ISoldProduct = { ...item, quantitySold: 0 };
    console.log(soldItemChanged);
    setItemsSold([...itemsSold, soldItemChanged]);
  };
  return (
    <div className="searchItemContainer">
      <div className="searchItemBox">{item.sku}</div>
      <div className="searchItemBox">{item.name}</div>
      <button className="searchItemBtn" onClick={handleAddClick}>
        +
      </button>
    </div>
  );
}

export default SearchResultItem;
