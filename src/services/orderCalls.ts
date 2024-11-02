import { IProduct } from "../interfaces/userContextInterfaces";
import { LOCAL_URL } from "../utils/urlConst";

const getHeaderInfo = (): HeadersInit => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
};

async function createOrder(orderProducts: IProduct[]): Promise<boolean> {
  const url = LOCAL_URL + "orders";

  const filteredOrders = orderProducts.filter((item) => item.quantity != 0);

  const newBody = {
    orderProducts: filteredOrders,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaderInfo(),
      body: JSON.stringify(newBody),
    });

    if (!response.ok) {
      throw new Error(`Error validating request body`);
    }

    const json: boolean = await response.json();

    return json;
  } catch (error) {
    throw new Error(`Server or network error`);
  }
}

async function getOrdersForStore(storeid: number) {
  const url = LOCAL_URL + `orders?storeid=${storeid}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: getHeaderInfo(),
    });

    if (!response.ok) {
      throw new Error(`Error validating request query`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    throw new Error(`Server or network error`);
  }
}

export { createOrder, getOrdersForStore };
