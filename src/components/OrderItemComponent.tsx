import { useState } from "react";
import { IOrderItem } from "../pages/Finance";
import { dateConvert } from "../utils/dateConversion";

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
        <div className="orderMoreInfo">{dateConvert(date)}</div>
        <div className="orderMoreInfo">{`$${total}`}</div>
        <button className="orderButtonThing" onClick={handleMoreClick}>
          More
        </button>
      </div>

      <div
        className={showMore ? `orderItemsHolder show` : `orderItemsHolder hide`}
      >
        {orderItems.map((item, index) => (
          <div key={index} className="orderedItemHolderForOrder">
            <div className="itemDetailsInHolder">{item.sku}</div>
            <div className="itemDetailsInHolder">{item.quantityordered}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderItemComponent;
