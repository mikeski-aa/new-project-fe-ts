import { useState } from "react";
import { IReport, ISoldProduct } from "../interfaces/userContextInterfaces";
import { dateConvert } from "../utils/dateConversion";

function ReportItemComponent({ report }: { report: IReport }) {
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleMoreClick = () => {
    if (!showMore) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  };

  return (
    <div className="reportItem">
      <div className="reportItemText">{dateConvert(report.date)}</div>
      <div className="reportItemText">{report.totalSaleValue}</div>
      <button className="reportMoreBtn" onClick={handleMoreClick}>
        More
      </button>
      <div
        className={showMore ? `reportItemHolder show` : `reportItemHolder hide`}
      >
        {report.soldProducts.map((item, index) => (
          <div key={index} className="orderedItemHolderForOrder">
            <div className="itemDetailsInHolder">{item.sku}</div>
            <div className="itemDetailsInHolder">{item.price}</div>
            <div className="itemDetailsInHolder">{item.quantitySold}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportItemComponent;
