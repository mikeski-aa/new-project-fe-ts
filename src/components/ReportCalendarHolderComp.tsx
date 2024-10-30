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
    console.log("SEE IF THIS WILL RETURN UNDEFINED AT ANY POINT?");
    console.log(yearArray);
    setActiveYear(yearArray[0].year);
    setActiveDisplay(yearArray[0].months);
  }, [yearArray]);

  const handleYearClick = (year: number) => {
    console.log(yearArray);
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
