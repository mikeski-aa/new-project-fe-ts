import { IError, IStoreResponse } from "../services/storeCalls";
import { IStore } from "../interfaces/userContextInterfaces";
import { Dispatch, SetStateAction } from "react";

// type guard for types
// this type guard will take the response argument, which can be IStoerResponse or IError.
// if the response is of type IStoreResponse it will return the !response.error
// this can be used in an If statement to evaluate how to proceed depending on resulting data.
function isStoreResponse(
  response: IStoreResponse | IError
): response is IStoreResponse {
  return !response.error;
}

function extractStore(
  storeResponse: IStoreResponse | IError,
  setCurrentStore: Dispatch<SetStateAction<IStore>>
) {
  if (isStoreResponse(storeResponse)) {
    const store: IStore = {
      id: storeResponse.id,
      userId: storeResponse.userId,
      name: storeResponse.name,
      products: storeResponse.products,
      location: storeResponse.location,
      picture: storeResponse.picture,
      reports: storeResponse.reports,
    };
    setCurrentStore(store);
    return store;
  } else {
    console.log(storeResponse.resTest);
  }
}

// guard function
function isStore(someItem: IStore | undefined): someItem is IStore {
  return true;
}

function dailyReportCheck(
  store: IStore | undefined,
  setDailyReport: Dispatch<SetStateAction<boolean>>
) {
  if (isStore(store)) {
    const today = new Date();
    const makedate = (xd: Date) => {
      const now = new Date(xd);
      return now;
    };
    const filtered = store.reports.filter(
      (item) =>
        makedate(item.date).setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)
    );

    console.log(filtered);

    if (filtered.length === 0) {
      setDailyReport(false);
    } else {
      setDailyReport(true);
    }
  }
}

export { extractStore, dailyReportCheck };
