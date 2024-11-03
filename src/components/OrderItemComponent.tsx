import { useState } from "react";
import { IOrderItem } from "../pages/Finance";

function dateConver(date: Date): string {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.toLocaleString("default", { month: "long" });
  const year = newDate.getFullYear();

  return `${day} ${month} ${year}`;
}

function OrderItemComponent({
  date,
  total,
  orderitems,
}: {
  date: Date;
  total: number;
  orderitems: IOrderItem[];
}) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const handleMoreClick = () => {
    if (!showMore) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  };
  return (
    <div className="orderItemContainer">
      <div className="orderMoreInfo">{dateConver(date)}</div>
      <div className="orderMoreInfo">{`$${total}`}</div>
      <button className="orderButtonThing" onClick={handleMoreClick}>
        More
      </button>
    </div>
  );
}

export default OrderItemComponent;
