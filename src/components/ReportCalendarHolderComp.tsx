import { useEffect, useState } from "react";
import { IMonth, IYearArrayHolder } from "../utils/reportConversions";
import ReportCalendar from "./ReportCalendarElement";

function ReportCalendarHolderComp({
  yearArray,
}: {
  yearArray: IYearArrayHolder[];
}) {
  const [activeYear, setActiveYear] = useState<number>();
  const [activeDisplay, setActiveDisplay] = useState<IMonth[]>([]);

  useEffect(() => {
    if (yearArray[0]) {
      setActiveYear(yearArray[0].year);
      setActiveDisplay(yearArray[0].months);
    }
  }, [yearArray]);

  const handleYearClick = (year: number) => {
    const foundYear = yearArray.find((item) => item.year === year);
    setActiveYear(year);
    if (foundYear) {
      setActiveDisplay(foundYear.months);
    }
  };

  return (
    <div className="yearCalendarContainer">
      {activeDisplay.map((item, index) => (
        <ReportCalendar month={item} key={index} />
      ))}
      {yearArray.map((item) => (
        <button className="yearText" onClick={() => handleYearClick(item.year)}>
          {item.year}
        </button>
      ))}
    </div>
  );
}

export default ReportCalendarHolderComp;
