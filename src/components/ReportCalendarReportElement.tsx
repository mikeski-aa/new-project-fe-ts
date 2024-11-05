import { useState } from "react";
import { IReport } from "../interfaces/userContextInterfaces";
import { convertDate } from "../utils/dateConversion";

function ReportCalendarReportElement({ reportItem }: { reportItem: IReport }) {
  const [modal, setModal] = useState<boolean>(false);
  const dateConversion = new Date(reportItem.date);
  const day = dateConversion.getDate();

  const handleDayClick = () => {
    setModal(true);
  };
  const handleCloseClick = () => {
    setModal(false);
  };
  return (
    <div className="indReportContainer">
      <button
        onClick={handleDayClick}
        className="calendarDayBtn"
      >{`${day}`}</button>
      <div className={modal ? "report show" : "report hide"}>
        <div className="reportModalInner">
          <h4>{`Sales report for ${convertDate(reportItem.date)}`}</h4>
          <div className="modalSoldHeading">
            <div className="soldProdItem">SKU</div>
            <div className="soldProdItem">Name</div>
            <div className="soldProdItem">Quantity sold</div>
            <div className="soldProdItem">Price</div>
          </div>
          {reportItem.soldProducts.map((item, index) => (
            <div key={index} className="modalSoldProductsContainer">
              <div className="soldProdItem">{item.sku}</div>
              <div className="soldProdItem">{item.name}</div>
              <div className="soldProdItem">{item.quantitySold}</div>
              <div className="soldProdItem">{item.price}</div>
            </div>
          ))}
          <div className="modalSoldTotal">{`Total sold: $${
            Math.round(reportItem.totalSaleValue * 100) / 100
          }`}</div>
          <button onClick={handleCloseClick} className="closeBtnReport">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportCalendarReportElement;
