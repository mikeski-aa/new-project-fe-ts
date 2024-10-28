import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { IProduct } from "../interfaces/userContextInterfaces";

function IndividualSoldItem({
  item,
  itemsSold,
  setItemsSold,
  searchList,
  setSearchList,
}: {
  item: IProduct;
  itemsSold: IProduct[];
  setItemsSold: Dispatch<SetStateAction<IProduct[]>>;
  searchList: IProduct[];
  setSearchList: Dispatch<SetStateAction<IProduct[]>>;
}) {
  const [quanSold, setQuanSold] = useState<number>(0);

  const handleDecrementClick = (): void | null => {
    const newValue = quanSold - 1;

    if (newValue < 1) {
      return null;
    }

    setQuanSold(newValue);
  };

  const handleIncrementClick = (): void | null => {
    const newValue = quanSold + 1;

    if (newValue > item.quantity) {
      return null;
    }

    setQuanSold(newValue);
  };

  const handleQuanInput = (e: SyntheticEvent): void | null => {
    const target = e.target as HTMLInputElement;

    if (+target.value > item.quantity || +target.value < 1) {
      return null;
    }

    setQuanSold(+target.value);
  };

  const handleRemoveClick = () => {
    const copySold = [...itemsSold];
    const filtredCopy = copySold.filter((soldItem) => soldItem.sku != item.sku);
    setItemsSold(filtredCopy);
    setSearchList([item, ...searchList]);
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
          max={item.quantity}
        ></input>
        <button className="btnQuan" onClick={handleIncrementClick}>
          +
        </button>
      </div>
      <button className="individualSoldBtn" onClick={handleRemoveClick}>
        remove
      </button>
    </div>
  );
}

export default IndividualSoldItem;
