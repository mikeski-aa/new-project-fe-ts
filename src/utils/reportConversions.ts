import { IReport } from "../interfaces/userContextInterfaces";

// this function takes an input of type IReport[]
// goes through each item, checks date, creates corresponding month
// needs to after that assign each report to each existing month
// order in asc order for months and items inside

export interface IMonth {
  name: string;
  reports: IReport[];
}

function sortMonths(monthArray: IMonth[]) {
  const tempArray: IMonth[] = [];

  const jan = monthArray.filter((item) => item.name === "January");
  const feb = monthArray.filter((item) => item.name === "February");
  const mar = monthArray.filter((item) => item.name === "March");
  const apr = monthArray.filter((item) => item.name === "April");
  const may = monthArray.filter((item) => item.name === "May");
  const jun = monthArray.filter((item) => item.name === "June");
  const jul = monthArray.filter((item) => item.name === "July");
  const aug = monthArray.filter((item) => item.name === "August");
  const sep = monthArray.filter((item) => item.name === "September");
  const oct = monthArray.filter((item) => item.name === "October");
  const nov = monthArray.filter((item) => item.name === "November");
  const dec = monthArray.filter((item) => item.name === "December");

  const newMonthArray = [
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
  ];

  newMonthArray.forEach((month) => {
    if (month.length > 0) {
      tempArray.push(month);
    }
  });

  return tempArray;
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

  console.log(sortMonths(monthArray));

  return monthArray;
}

export { getMonthsFromReports };
