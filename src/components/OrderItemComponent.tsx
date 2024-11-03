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
  orderItems,
}: {
  date: Date;
  total: number;
  orderItems: IOrderItem[];
}) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const handleMoreClick = () => {
    if (!showMore) {
      setShowMore(true);
      console.log(orderItems);
    } else {
      setShowMore(false);
    }
  };

  return (
    <div className="orderItemContainerOutside">
      <div className="orderItemContainer">
        <div className="orderMoreInfo">{dateConver(date)}</div>
        <div className="orderMoreInfo">{`$${total}`}</div>
        <button className="orderButtonThing" onClick={handleMoreClick}>
          More
        </button>
      </div>
      <div
        className={showMore ? `orderItemsHolder show` : `orderItemsHolder hide`}
      >
        <div
          className={
            showMore ? `orderItemsHolder show` : `orderItemsHolder hide`
          }
        >
          {orderItems.map((item, index) => (
            <div key={index} className="orderedItemHolderForOrder">
              <div className="itemDetailsInHolder">{item.sku}</div>
              <div className="itemDetailsInHolder">{item.quantityordered}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderItemComponent;
