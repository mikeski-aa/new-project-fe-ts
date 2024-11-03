import { useState } from "react";
import { IOrderItem } from "../pages/Finance";
import { dateConvert } from "../utils/dateConversion";
import Chevron from "../assets/chevron.svg?react";
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
    setShowMore(!showMore);
  };

  return (
    <div className="orderItemContainerOutside">
      <div className="orderItemContainer">
        <div className="orderMoreInfo">{dateConvert(date)}</div>
        <div className="orderMoreInfo">{`$${total}`}</div>
        <button className="reportMoreBtn" onClick={handleMoreClick}>
          <Chevron className={showMore ? "chevron down" : "chevron up"} />
        </button>
      </div>

      <div
        className={showMore ? `orderItemsHolder show` : `orderItemsHolder hide`}
      >
        <div className="repItemHeadingHolder">
          <div className="itemDetailsInHolder">SKU</div>
          <div className="itemDetailsInHolder">Quantity ordered</div>
        </div>
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
