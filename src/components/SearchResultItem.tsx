import { Dispatch, SetStateAction } from "react";
import { INewItem } from "../interfaces/storeInterfaces";
import { IProduct } from "../interfaces/userContextInterfaces";

function SearchResultItem({
  item,
  itemsSold,
  setItemsSold,
}: {
  item: IProduct;
  itemsSold: IProduct[];
  setItemsSold: Dispatch<SetStateAction<IProduct[]>>;
}) {
  const handleAddClick = () => {
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
