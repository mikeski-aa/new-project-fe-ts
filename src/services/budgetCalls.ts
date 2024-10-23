import LOCAL_URL from "../utils/urlConst";
import { IBudget, IItem } from "../App";

const headerInfo: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
};

interface IError {
  error: boolean;
  resTest: string;
}

async function getBudgets(
  userId: number | null | undefined
): Promise<IBudget[] | IError> {
  const url = LOCAL_URL + `/budgets?userid=${userId}`;

  try {
    const response = await fetch(url, { method: "GET", headers: headerInfo });

    if (!response.ok) {
      const test: IError = {
        error: true,
        resTest: "Error getting response from API",
      };
      return test;
    }

    const json: IBudget[] = await response.json();

    return json;
  } catch (error) {
    const test: IError = { error: true, resTest: "Error fetching url" };
    return test;
  }
}

export { getBudgets };
