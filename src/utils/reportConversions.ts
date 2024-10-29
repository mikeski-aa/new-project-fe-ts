import { IReport } from "../interfaces/userContextInterfaces";

// this function takes an input of type IReport[]
// goes through each item, checks date, creates corresponding month
// needs to after that assign each report to each existing month
// order in asc order for months and items inside

interface IMonth {
  name: string;
  reports: IReport[];
}

function getMonthsFromReports(reports: IReport[]) {
  const monthArray: IMonth[] = [];
  const testArray: string[] = [];

  for (let x = 0; x < reports.length; x++) {
    const tempDate = new Date(reports[x].date);
    const monthName = tempDate.toLocaleString("default", { month: "long" });
    if (testArray.includes(monthName)) {
      console.log("duplicate found!");
    } else {
      testArray.push(monthName);
    }
  }

  console.log(testArray);
}

export { getMonthsFromReports };
