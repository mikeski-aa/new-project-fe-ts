import { LOCAL_URL } from "../utils/urlConst";
import { IStore, IProduct } from "../interfaces/userContextInterfaces";

const getHeaderInfo = (): HeadersInit => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
};

interface IError {
  error: boolean;
  resTest: string;
}

interface IStoreResponse extends IError {
  id: number;
  userId: number;
  name: string;
  products: IProduct[];
  location: string;
  picture: string;
}

// rewritten response interface

interface INewRwResponse {
  errorPresent: boolean;
  error?: string;
  store?: IStore[];
}

// gets all store info
async function getStores(
  userId: number | null | undefined
): Promise<INewRwResponse> {
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
      return {
        errorPresent: true,
        error: "Input validation error",
      };
    }

    const json: IStore[] = await response.json();

    return { ...json, errorPresent: false };
  } catch (error) {
    return { errorPresent: true, error: "Network or server error" };
  }
}

// gets specific store info
async function getStore(storeId: string | number): Promise<INewRwResponse> {
  const url = LOCAL_URL + `stores/store?storeid=${storeId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: getHeaderInfo(),
    });
    if (!response.ok) {
      return {
        errorPresent: true,
        error: "Input validation error",
      };
    }

    const json: IStore = await response.json();

    return { ...json, errorPresent: false };
  } catch (error) {
    return { errorPresent: true, error: "Network or server error" };
  }
}

async function postStore(
  name: string,
  location: string,
  userId: number | null
): Promise<INewRwResponse> {
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
      return {
        errorPresent: true,
        error: "Input validation error",
      };
    }

    const json: IStore = await response.json();
    console.log(json);

    return { ...json, errorPresent: false };
  } catch (error) {
    return { errorPresent: true, error: "Network or server error" };
  }
}

// delete a specific store
async function deleteStore(
  userid: number,
  storeid: number
): Promise<INewRwResponse> {
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
      return {
        errorPresent: true,
        error: "Input validation error",
      };
    }

    const json: IStore = await response.json();
    return { ...json, errorPresent: false };
  } catch (error) {
    return { errorPresent: true, error: "Network or server error" };
  }
}

// update specific store info
async function updateStore(
  userid: number,
  storeid: number,
  name: string,
  location: string
): Promise<INewRwResponse> {
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
      return {
        errorPresent: true,
        error: "Input validation error",
      };
    }

    const json: IStore = await response.json();

    return { ...json, errorPresent: false };
  } catch (error) {
    console.log(error);
    return { errorPresent: true, error: "Network or server error" };
  }
}

// export { getStores, getStore, postStore, deleteStore, updateStore };
