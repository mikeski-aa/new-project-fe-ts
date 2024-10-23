import LOCAL_URL from "../utils/urlConst";

const headerInfo: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
};

interface IItem {
  id: number;
  budgetId: number;
  name: string;
  price: number;
  date: string;
}

interface IBudget {
  budgetValue: number;
  customInterval: number | null | undefined;
  id: number;
  name: string;
  userId: number;
  item: IItem;
}

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
