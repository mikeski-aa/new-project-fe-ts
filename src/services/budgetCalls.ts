import LOCAL_URL from "../utils/urlConst";
import { IBudget, IItem } from "../App";

const headerInfo: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
};

async function getBudgets(
  userId: number | null | undefined
): Promise<IBudget | void> {
  const url = LOCAL_URL + `/budgets?userid=${userId}`;

  try {
    const response = await fetch(url, { method: "GET", headers: headerInfo });

    if (!response.ok) {
      console.log(response);
      return;
    }

    const json: IBudget = await response.json();

    console.log(json);

    return json;
  } catch (error) {
    console.log(error);
    return;
  }
}

export { getBudgets };
