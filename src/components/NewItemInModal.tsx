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
  const handleRemoveClick = () => {
    const tempState = [...state];
    const filteredState = tempState.filter(
      (newItem) => newItem.sku !== item.sku
    );
    console.log(filteredState);

    setState(filteredState);
  };
  return (
    <div className="newAddItem">
      <div className="itemProperty">{item.sku}</div>
      <div className="itemProperty">{item.name}</div>
      <div className="itemProperty">{item.category}</div>
      <div className="itemProperty">{item.price}</div>
      <div className="itemProperty">{item.purchasePrice}</div>
      <div className="itemProperty">{item.quantity}</div>
      <button onClick={handleRemoveClick} className="modalBtn remove thing">
        Remove
      </button>
    </div>
  );
}

export default NewItemInModal;
