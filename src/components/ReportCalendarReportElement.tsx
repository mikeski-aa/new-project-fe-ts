import { IReport } from "../interfaces/userContextInterfaces";

function ReportCalendarReportElement({ reportItem }: { reportItem: IReport }) {
  return (
    <div className="indReportContainer">
      <div className="reportItem">{`${reportItem.date}`}</div>
      <div className="reportItem">{`Products sold: ${reportItem.soldProducts}`}</div>
      <div className="reportItem">{`Total sales: $${reportItem.totalSaleValue}`}</div>
      <button>Open report</button>
    </div>
  );
}

export default ReportCalendarReportElement;
