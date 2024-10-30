import { IReport } from "../interfaces/userContextInterfaces";

// this function takes an input of type IReport[]
// goes through each item, checks date, creates corresponding month
// needs to after that assign each report to each existing month
// order in asc order for months and items inside

export interface IMonth {
  name: string;
  reports: IReport[];
  year: number;
}

function getMonthsFromReports(reports: IReport[]): IMonth[] {
  const monthArray: IMonth[] = [];

  reports.forEach((report) => {
    const reportDate = new Date(report.date);
    const reportMonth = reportDate.toLocaleString("default", { month: "long" });
    const reportYear = reportDate.getFullYear();

    console.log(reportYear);

    const findMonth = monthArray.find(
      (month) => month.name === reportMonth && month.year === reportYear
    );

    if (findMonth) {
      findMonth.reports.push(report);
    } else {
      monthArray.push({
        name: reportMonth,
        reports: [report],
        year: reportYear,
      });
    }
  });

  console.log(monthArray);

  console.log(assignYearToMonth(monthArray));

  return monthArray;
}

interface IYearArrayHolder {
  months: IMonth[];
  year: number;
}

function assignYearToMonth(monthArray: IMonth[]) {
  const yearArray: IYearArrayHolder[] = [];

  monthArray.forEach((month) => {
    const findYear = yearArray.find((year) => year.year === month.year);

    if (findYear) {
      findYear.months.push(month);
    } else {
      yearArray.push({ months: [month], year: month.year });
    }
  });

  return yearArray;
}

export { getMonthsFromReports };
