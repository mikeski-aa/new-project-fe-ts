import { SyntheticEvent, useState } from "react";
import { IProduct } from "../interfaces/userContextInterfaces";

function IndividualOrderItem({ item }: { item: IProduct }) {
  const [orderQuant, setOrderQuant] = useState<number>(0);

  const handleOrderQuantChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setOrderQuant(+target.value);
  };

  return (
    <div className="newOrderItemCont">
      <div className="itemProperty">{item.sku}</div>
      <div className="itemProperty">{item.name}</div>
      <div className="itemProperty">{item.category}</div>
      <div className="itemProperty">{item.price}</div>
      <div className="itemProperty">{item.purchasePrice}</div>
      <input
        type="number"
        min={0}
        value={orderQuant}
        onChange={(e) => handleOrderQuantChange(e)}
      ></input>
    </div>
  );
}

export default IndividualOrderItem;
