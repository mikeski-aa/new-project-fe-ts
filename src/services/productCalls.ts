import { LOCAL_URL } from "../utils/urlConst";
import { IProduct } from "../interfaces/userContextInterfaces";
import { INewItem } from "../interfaces/storeInterfaces";
import { INewProdResponse } from "../interfaces/userContextInterfaces";

const getHeaderInfo = (): HeadersInit => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
};

async function addProducts(
  storeid: number,
  items: INewItem[]
): Promise<INewProdResponse> {
  const url = LOCAL_URL + "product";
  const newbody = {
    items: items,
    storeid: storeid,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaderInfo(),
      body: JSON.stringify(newbody),
    });

    if (!response.ok) {
      return {
        errorPresent: true,
        error: "Input validation error",
      };
    }

    const count: number = await response.json();
    return { count, errorPresent: false };
  } catch (error) {
    return { errorPresent: true, error: "Network or server error" };
  }
}

async function deleteProduct(itemid: number): Promise<INewProdResponse> {
  const url = LOCAL_URL + `product?itemid=${itemid}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: getHeaderInfo(),
    });

    if (!response.ok) {
      return {
        errorPresent: true,
        error: "Input validation error",
      };
    }

    const item: IProduct = await response.json();

    return { item, errorPresent: false };
  } catch (error) {
    return { errorPresent: true, error: "Network or server error" };
  }
}

export { addProducts, deleteProduct };
