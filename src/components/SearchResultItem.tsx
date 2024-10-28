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
  const handleAddClick = () => {
    const currentCopy = [...currentItems];
    const filteredItems = currentCopy.filter(
      (filItem) => filItem.sku != item.sku
    );
    console.log(filteredItems);
    setCurrentItems(filteredItems);
    setItemsSold([...itemsSold, item]);
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
