import { useState } from "react";
import { IReport } from "../interfaces/userContextInterfaces";
import { convertDate } from "../utils/dateConversion";

function ReportCalendarReportElement({ reportItem }: { reportItem: IReport }) {
  const [modal, setModal] = useState<boolean>(false);
  const dateConversion = new Date(reportItem.date);
  const day = dateConversion.getDate();

  const handleDayClick = () => {
    setModal(true);
    console.log(reportItem);
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
          <button onClick={handleCloseClick}>close</button>
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
          <div className="modalSoldTotal">{`Total sold: $${reportItem.totalSaleValue}`}</div>
        </div>
      </div>
      {/* <div className="reportItem">{`${day}`}</div>
      <div className="reportItem">{`Products sold: ${reportItem.soldProducts}`}</div>
      <div className="reportItem">{`Total sales: $${reportItem.totalSaleValue}`}</div> */}
      {/* <button>Open report</button> */}
    </div>
  );
}

export default ReportCalendarReportElement;
