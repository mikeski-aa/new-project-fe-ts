import LOCAL_URL from "../utils/urlConst";

const headerInfo: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
};

async function getBudgets(userId: number) {
  const url = LOCAL_URL + `/budgets?userid=${userId}`;

  try {
    const response = await fetch(url, { method: "GET", headers: headerInfo });

    if (!response.ok) {
      return console.log(response);
    }

    const json = response.json();

    console.log(json);

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { getBudgets };
