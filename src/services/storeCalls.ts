import { LOCAL_URL } from "../utils/urlConst";
import { IStore, IProduct } from "../interfaces/userContextInterfaces";

const getHeaderInfo = (): HeadersInit => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
};

export interface IError {
  error: boolean;
  resTest: string;
}

export interface IStoreResponse extends IError {
  id: number;
  userId: number;
  name: string;
  products: IProduct[];
  location: string;
  picture: string;
}

// gets all store info
async function getStores(
  userId: number | null | undefined
): Promise<IStore[] | IError> {
  const url = LOCAL_URL + `stores?userid=${userId}`;

  try {
    console.log("GOING INTO GET STORES CALL");
    console.log("token?");
    console.log(localStorage.getItem("token"));
    const response = await fetch(url, {
      method: "GET",
      headers: getHeaderInfo(),
    });

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

// gets specific store info
async function getStore(
  storeId: string | number
): Promise<IStoreResponse | IError> {
  const url = LOCAL_URL + `stores/store?storeid=${storeId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: getHeaderInfo(),
    });
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
    const test = {
      error: true,
      resTest: "Error fetching url",
    };
    return test;
  }
}

async function postStore(
  name: string,
  location: string,
  userId: number | null | undefined
): Promise<boolean> {
  const url = LOCAL_URL + "stores";
  const newBody = {
    name: name,
    location: location,
    userId: userId,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaderInfo(),
      body: JSON.stringify(newBody),
    });
    if (!response.ok) {
      return false;
    }

    console.log(response);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// delete a specific store
async function deleteStore(userid: number, storeid: number): Promise<boolean> {
  const url = LOCAL_URL + "stores";
  const newBody = {
    userId: userid,
    storeId: storeid,
  };
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: getHeaderInfo(),
      body: JSON.stringify(newBody),
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// update specific store info
async function updateStore(
  userid: number,
  storeid: number,
  name: string,
  location: string
): Promise<boolean> {
  const url = LOCAL_URL + "stores";
  const newBody = {
    userid: userid,
    storeid: storeid,
    name: name,
    location: location,
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: getHeaderInfo(),
      body: JSON.stringify(newBody),
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { getStores, getStore, postStore, deleteStore, updateStore };
