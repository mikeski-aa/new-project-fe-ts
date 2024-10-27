import { INewItem } from "../interfaces/storeInterfaces";

function SearchResultItem({ item }: { item: INewItem }) {
  return (
    <div className="searchItemContainer">
      <div className="searchItemBox">{item.sku}</div>
      <div className="searchItemBox">{item.name}</div>
      <button className="searchItemBtn">+</button>
    </div>
  );
}

export default SearchResultItem;
