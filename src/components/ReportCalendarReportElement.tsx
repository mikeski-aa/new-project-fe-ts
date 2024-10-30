import { IReport } from "../interfaces/userContextInterfaces";

function ReportCalendarReportElement({ reportItem }: { reportItem: IReport }) {
  const dateConversion = new Date(reportItem.date);
  const day = dateConversion.getDate();

  return (
    <div className="indReportContainer">
      <button>{`${day}`}</button>
      {/* <div className="reportItem">{`${day}`}</div>
      <div className="reportItem">{`Products sold: ${reportItem.soldProducts}`}</div>
      <div className="reportItem">{`Total sales: $${reportItem.totalSaleValue}`}</div> */}
      {/* <button>Open report</button> */}
    </div>
  );
}

export default ReportCalendarReportElement;
