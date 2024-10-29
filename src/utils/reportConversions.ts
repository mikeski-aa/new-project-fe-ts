import { IReport } from "../interfaces/userContextInterfaces";

// this function takes an input of type IReport[]
// goes through each item, checks date, creates corresponding month
// needs to after that assign each report to each existing month
// order in asc order for months and items inside

interface IMonth {
  name: string;
  reports: IReport[];
}

function getMonthsFromReports(reports: IReport[]): IMonth[] {
  const monthArray: IMonth[] = [];

  reports.forEach((report) => {
    const reportDate = new Date(report.date);
    const reportMonth = reportDate.toLocaleString("default", { month: "long" });

    const findMonth = monthArray.find((month) => month.name === reportMonth);

    if (findMonth) {
      findMonth.reports.push(report);
    } else {
      monthArray.push({ name: reportMonth, reports: [report] });
    }
  });

  console.log(monthArray);

  return monthArray;
}

export { getMonthsFromReports };
