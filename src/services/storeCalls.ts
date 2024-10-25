import LOCAL_URL from "../utils/urlConst";
import { IStore, IProduct } from "../interfaces/userContextInterfaces";

const headerInfo: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
};

export interface IError {
  error: boolean;
  resTest: string;
}

// gets all store info
async function getStores(
  userId: number | null | undefined
): Promise<IStore[] | IError> {
  const url = LOCAL_URL + `/stores?userid=${userId}`;

  try {
    const response = await fetch(url, { method: "GET", headers: headerInfo });

    if (!response.ok) {
      const test: IError = {
        error: true,
        resTest: "Error getting response from API",
      };
      return test;
    }

    const json: IStore[] = await response.json();

    return json;
  } catch (error) {
    const test: IError = { error: true, resTest: "Error fetching url" };
    return test;
  }
}

interface IStoreResponse extends IError {
  id?: number;
  userId?: number;
  name?: string;
  products?: IProduct[];
  location?: string;
  picture?: string;
}

// gets specific store info
async function getStore(storeId: string): Promise<IStoreResponse> {
  const url = LOCAL_URL + `/stores/store?storeid=${storeId}`;

  try {
    const response = await fetch(url, { method: "GET", headers: headerInfo });
    if (!response.ok) {
      const test = {
        error: true,
        resTest: "Error getting response from API",
      };
      return test;
    }

    const json: IStore = await response.json();
    const returnJson = { ...json, error: false, resTest: "" };
    return returnJson;
  } catch (error) {
    const test = { error: true, resTest: "Error fetching url" };
    return test;
  }
}

export { getStores, getStore };
