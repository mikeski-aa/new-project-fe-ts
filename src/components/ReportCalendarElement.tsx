import { IMonth } from "../utils/reportConversions";
import "../styles/reportcalendar.css";
import ReportCalendarReportElement from "./ReportCalendarReportElement";

function ReportCalendar({ month }: { month: IMonth }) {
  return (
    <div className="calendarHolder">
      <h4 className="headingMonth">{month.name}</h4>
      <div className="calendarReportHolder">
        {month.reports.map((report, index) => (
          <ReportCalendarReportElement key={index} reportItem={report} />
        ))}
      </div>
    </div>
  );
}

export default ReportCalendar;
