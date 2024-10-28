import { LOCAL_URL } from "../utils/urlConst";
import { IStore, IProduct } from "../interfaces/userContextInterfaces";
import { INewItem } from "../interfaces/storeInterfaces";

const headerInfo: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
};

async function addProducts(storeid: number, items: INewItem[]) {
  const url = LOCAL_URL + "product";
  const newbody = {
    items: items,
    storeid: storeid,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headerInfo,
      body: JSON.stringify(newbody),
    });

    if (!response.ok) {
      console.log(response.status);
      return;
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function deleteProduct(itemid: number): Promise<boolean> {
  const url = LOCAL_URL + `product?itemid=${itemid}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: headerInfo,
    });

    if (!response.ok) {
      console.log(response.status);
      return false;
    }

    console.log(response);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { addProducts, deleteProduct };
