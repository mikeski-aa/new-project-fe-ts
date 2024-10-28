import { ISoldProduct } from "../interfaces/userContextInterfaces";
import LOCAL_URL from "../utils/urlConst";

const headerInfo: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
};

async function createReport(
  storeid: number,
  totalValue: number,
  soldItems: ISoldProduct[]
) {
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
      headers: headerInfo,
      body: JSON.stringify(newBody),
    });

    if (!response.ok) {
      console.log(response.status);
      return false;
    }

    const json = await response.json();

    console.log(json);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { createReport };
