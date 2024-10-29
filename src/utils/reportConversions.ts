import { IReport } from "../interfaces/userContextInterfaces";

// this function takes an input of type IReport[]
// goes through each item, checks date, creates corresponding month
// needs to after that assign each report to each existing month
// order in asc order for months and items inside
function getMonthsFromReports(reports: IReport[]) {
  const monthArray = [];

  for (let x = 0; x < reports.length; x++) {
    const tempDate = new Date(reports[x].date);
    monthArray.push(tempDate.toLocaleString("default", { month: "long" }));
  }

  console.log(monthArray);
}

export { getMonthsFromReports };
