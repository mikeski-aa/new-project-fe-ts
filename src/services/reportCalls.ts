import { IReport, ISoldProduct } from "../interfaces/userContextInterfaces";
import { getHeaderInfo, LOCAL_URL } from "../utils/urlConst";

export interface IReportResponse {
  errorPresent: boolean;
  error?: string;
  reportItem?: IReport;
}

async function createReport(
  storeid: number,
  totalValue: number,
  soldItems: ISoldProduct[]
): Promise<IReportResponse> {
  const url = LOCAL_URL + "report";
  const newBody = {
    storeId: storeid,
    totalValue: totalValue,
    soldItems: soldItems,
  };

  console.log(newBody);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaderInfo(),
      body: JSON.stringify(newBody),
    });

    if (!response.ok) {
      console.log(response.status);
      return {
        errorPresent: true,
        error: `API response erro ${response.status}`,
      };
    }

    const reportItem: IReport = await response.json();

    return { reportItem, errorPresent: false };
  } catch (error) {
    console.log(error);
    return { errorPresent: true, error: `Server or network error` };
  }
}

async function deleteReport(reportid: number): Promise<IReportResponse> {
  const url = LOCAL_URL + "report";
  const newBody = {
    reportid: reportid,
  };
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: getHeaderInfo(),
      body: JSON.stringify(newBody),
    });
    if (!response.ok) {
      console.log(response.status);
      return {
        errorPresent: true,
        error: `API response erro ${response.status}`,
      };
    }

    const reportItem: IReport = await response.json();

    return { reportItem, errorPresent: false };
  } catch (error) {
    console.log(error);
    return { errorPresent: true, error: `Server or network error` };
  }
}

async function rollbackData(report: IReport): Promise<IReportResponse> {
  const url = LOCAL_URL + "report";
  const newBody = {
    storeId: report.storeId,
    soldProducts: report.soldProducts,
  };
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: getHeaderInfo(),
      body: JSON.stringify(newBody),
    });
    if (!response.ok) {
      console.log(response.status);
      return {
        errorPresent: true,
        error: `API response error ${response.status}`,
      };
    }

    const reportItem: IReport = await response.json();

    return { reportItem, errorPresent: false };
  } catch (error) {
    console.log(error);
    return { errorPresent: true, error: `Server or network error` };
  }
}

export { createReport, deleteReport, rollbackData };
