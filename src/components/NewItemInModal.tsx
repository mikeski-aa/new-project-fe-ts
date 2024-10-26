import { Dispatch, SetStateAction } from "react";
import { INewItem } from "../interfaces/storeInterfaces";

function NewItemInModal({
  item,
  state,
  setState,
}: {
  item: INewItem;
  state: INewItem[];
  setState: Dispatch<SetStateAction<INewItem[]>>;
}) {
  const handleRemoveClick = () => {};
  return (
    <div className="newAddItem">
      <div className="itemProperty">{item.sku}</div>
      <div className="itemProperty">{item.name}</div>
      <div className="itemProperty">{item.type}</div>
      <div className="itemProperty">{item.price}</div>
      <div className="itemProperty">{item.quantity}</div>
      <button onClick={handleRemoveClick}>Remove</button>
    </div>
  );
}

export default NewItemInModal;
