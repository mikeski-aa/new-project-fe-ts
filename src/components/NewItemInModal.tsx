import { INewItem } from "../interfaces/storeInterfaces";

function NewItemInModal({ item }: { item: INewItem }) {
  return (
    <div className="newAddItem">
      <div className="itemProperty">{item.sku}</div>
      <div className="itemProperty">{item.name}</div>
      <div className="itemProperty">{item.type}</div>
      <div className="itemProperty">{item.price}</div>
      <div className="itemProperty">{item.quantity}</div>
      <button>Remove</button>
    </div>
  );
}

export default NewItemInModal;
