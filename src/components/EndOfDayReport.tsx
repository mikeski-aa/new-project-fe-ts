import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import "../styles/endofdayreport.css";
import { convertDate } from "../utils/dateConversion";
import {
  IProduct,
  ISoldProduct,
  IStore,
} from "../interfaces/userContextInterfaces";
import SearchResultItem from "./SearchResultItem";
import IndividualSoldItem from "./IndividualSoldItem";
import { createReport } from "../services/reportCalls";
import { dailyReportCheck, extractStore } from "../utils/storeUpdateHelper";
import { getStore } from "../services/storeCalls";

// when opened, the report should check if someone has already upload EOD sales
// if someone wants to override sale report, there needs to be extra step to confirm
function EndOfDayReport({
  modal,
  setModal,
  products,
  storeId,
  setCurrentStore,
  dailyReport,
  setDailyReport,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  products: IProduct[];
  storeId: number;
  setCurrentStore: Dispatch<SetStateAction<IStore>>;
  dailyReport: boolean;
  setDailyReport: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchList, setSearchList] = useState<IProduct[]>([]);
  const [itemsSold, setItemsSold] = useState<ISoldProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const dateToday = convertDate();

  const handleCloseClick = () => {
    setSearchInput("");
    setModal(false);
  };

  // check difference between
  //   const target = e.target as HTMLInputElement;
  //   and
  //   const target:HTMLInputElement = e.target;
  const handleInputChange = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setSearchInput(target.value);

    const shallowProducts = [...products];

    if (target.value != "") {
      const filteredArray = shallowProducts.filter((item) =>
        item.sku.includes(target.value.toUpperCase())
      );

      setSearchList(filteredArray);
    } else {
      setSearchList([]);
    }
  };

  // this will create new EOD sale report in DB
  // this needs to close modal on click
  // this needs to reset the items sold state
  // this needs to warn user that this action can only be done once a day
  // also needs to update the db values for items that have been sold
  // update the store state afterwards to reflect changes in the quantity remaining
  const handleSaveClick = async (): Promise<void | null> => {
    if (itemsSold.length === 0) {
      return null;
    }

    setLoading(true);

    let tVal = itemsSold.reduce((total, item) => {
      return total + item.quantitySold * item.price;
    }, 0);

    const response = await createReport(storeId, tVal, itemsSold);
    setSearchInput("");
    setItemsSold([]);
    const storeResponse = await getStore(storeId);

    if (!storeResponse.errorPresent && storeResponse.store) {
      setCurrentStore(storeResponse.store);
      dailyReportCheck(storeResponse.store, setDailyReport);

      setLoading(false);
      setModal(false);
    }
  };

  return (
    <div className={modal ? "eodModal show" : "eodModal hide"}>
      <div className="eodMainContainer">
        <button className="eodModalBtn" onClick={handleCloseClick}>
          Close
        </button>
        <div className="reportHeading">{`Add sale items for ${dateToday}`}</div>
        {loading ? <h1>LOADING</h1> : null}
        {dailyReport ? (
          <h4>
            DAILY REPORT ALREADY SUBMITTED! If you want to generate a new daily
            report, you first need to revert the last daily report.
          </h4>
        ) : null}
        <div className="soldContainer">
          {itemsSold.map((item, index) => (
            <IndividualSoldItem
              key={index}
              item={item}
              searchList={searchList}
              setSearchList={setSearchList}
              itemsSold={itemsSold}
              setItemsSold={setItemsSold}
            />
          ))}
        </div>
        <div className="itemSearchContainer">
          <label>Search item by SKU</label>
          <input
            className="itemSearchInput"
            type="string"
            placeholder="Item SKU"
            value={searchInput}
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div className="searchResultContainer">
          {searchList.map((item, index) => (
            <SearchResultItem
              item={item}
              key={index}
              itemsSold={itemsSold}
              setItemsSold={setItemsSold}
              currentItems={searchList}
              setCurrentItems={setSearchList}
            />
          ))}
        </div>
        <button className="eodModalBtn" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EndOfDayReport;
