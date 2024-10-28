import { SyntheticEvent, useState } from "react";
import { IProduct } from "../interfaces/userContextInterfaces";

function IndividualSoldItem({ item }: { item: IProduct }) {
  const [quanSold, setQuanSold] = useState<number>(0);

  const handleDecrementClick = () => {
    const newValue = quanSold - 1;
    setQuanSold(newValue);
  };

  const handleIncrementClick = () => {
    const newValue = quanSold + 1;
    setQuanSold(newValue);
  };

  const handleQuanInput = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setQuanSold(+target.value);
  };

  return (
    <div className="individualSoldItem">
      <div className="soldItemBox">{item.sku}</div>
      <div className="soldItemBox">{item.name}</div>
      <div className="soldInputBox">
        <button className="btnQuan" onClick={handleDecrementClick}>
          -
        </button>
        <input
          className="soldItemInput"
          type="number"
          placeholder="quantity"
          value={quanSold}
          onChange={(e) => handleQuanInput(e)}
        ></input>
        <button className="btnQuan" onClick={handleIncrementClick}>
          +
        </button>
      </div>
    </div>
  );
}

export default IndividualSoldItem;
