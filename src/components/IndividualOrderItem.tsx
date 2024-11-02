import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { IProduct } from "../interfaces/userContextInterfaces";

function IndividualOrderItem({
  item,
  copyProducts,
  setCopyProducts,
}: {
  item: IProduct;
  copyProducts: IProduct[];
  setCopyProducts: Dispatch<SetStateAction<IProduct[]>>;
}) {
  const [orderQuant, setOrderQuant] = useState<number>();

  const handleOrderQuantChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setOrderQuant(+target.value);
    const copyState = [...copyProducts];
    copyState.map((product) => {
      product.sku === item.sku ? (product.quantity = +target.value) : null;
    });

    console.log(copyState);
    setCopyProducts(copyState);
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
        className="inputOrderItemQuant"
        min={0}
        value={orderQuant}
        onChange={(e) => handleOrderQuantChange(e)}
      ></input>
    </div>
  );
}

export default IndividualOrderItem;
