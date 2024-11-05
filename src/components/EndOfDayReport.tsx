import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import "../styles/endofdayreport.css";
import { convertDate } from "../utils/dateConversion";
import {
  IProduct,
  ISoldProduct,
  IStore,
} from "../interfaces/userContextInterfaces";
import SearchResultItem from "./SearchResultItem";
import IndividualSoldItem from "./IndividualSoldItem";
import {
  createReport,
  deleteReport,
  rollbackData,
} from "../services/reportCalls";
import { dailyReportCheck } from "../utils/storeUpdateHelper";
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
  currentStore,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  products: IProduct[];
  storeId: number;
  setCurrentStore: Dispatch<SetStateAction<IStore>>;
  dailyReport: boolean;
  setDailyReport: Dispatch<SetStateAction<boolean>>;
  currentStore: IStore;
}) {
  const [searchList, setSearchList] = useState<IProduct[]>([]);
  const [currentProducts, setCurrentProducts] = useState<IProduct[]>([]);
  const [itemsSold, setItemsSold] = useState<ISoldProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [revertLoading, setRevertLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const dateToday = convertDate();

  useEffect(() => {
    setCurrentProducts(products);
  }, [products]);

  const handleCloseClick = () => {
    setSearchInput("");
    setSearchList([]);
    setItemsSold([]);
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

    await createReport(storeId, tVal, itemsSold);
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

  const handleRevertClick = async () => {
    setRevertLoading(true);
    // since reports are ordered in ascending order, the last report in the array
    // the last report is the one we want to use to revert data
    // first we roll back -> then delete
    await rollbackData(currentStore.reports[currentStore.reports.length - 1]);
    await deleteReport(
      currentStore.reports[currentStore.reports.length - 1].id
    );

    // now we need to update store to reflect reversion
    const storeResponse = await getStore(storeId);

    if (!storeResponse.errorPresent && storeResponse.store) {
      setCurrentStore(storeResponse.store);
      dailyReportCheck(storeResponse.store, setDailyReport);

      setLoading(false);
      setModal(false);
    }

    setRevertLoading(false);
    setDailyReport(false);
  };

  return (
    <div className={modal ? "eodModal show" : "eodModal hide"}>
      <div className="eodMainContainer">
        {dailyReport ? (
          <>
            {revertLoading ? (
              <h1 className="revertingHeading">
                REVERTING PREVIOUS SALE REPORT
              </h1>
            ) : (
              <>
                {" "}
                <h4 className="warning">
                  DAILY REPORT ALREADY SUBMITTED for {dateToday}! If the
                  existing report has a mistake or was submitted accidentally,
                  you will need to revert it. This cannot be undone, you will
                  lose all report data you have submitted! If you removed an
                  item from the store after subbmitting it in a report, it will
                  be restored. Manually re-adding the same SKU after deleting
                  post report submission will cause restore to change current
                  quanitity.
                </h4>
                <button onClick={handleRevertClick} className="revertReport">
                  I have read the warning and would like to revert
                </button>
                <button
                  onClick={handleCloseClick}
                  className="revertReport cancel"
                >
                  Cancel
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <div className="reportHeading">{`Add sale items for ${dateToday}`}</div>
            {loading ? (
              <h1>Please wait, creating new EOD report</h1>
            ) : (
              <>
                {" "}
                <div className="soldContainer">
                  {itemsSold.map((item, index) => (
                    <IndividualSoldItem
                      key={index}
                      item={item}
                      searchList={searchList}
                      setSearchList={setSearchList}
                      itemsSold={itemsSold}
                      setItemsSold={setItemsSold}
                      setCurrentProducts={setCurrentProducts}
                    />
                  ))}
                </div>
                <div className="itemSearchContainer">
                  <label className="labelForSkuInput">Search item by SKU</label>
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
                      currentProducts={currentProducts}
                      setCurrentProducts={setCurrentProducts}
                    />
                  ))}
                </div>
                <div className="saleReportButtonContainer">
                  <button className="eodModalBtn" onClick={handleSaveClick}>
                    Save
                  </button>
                  <button
                    className="eodModalBtn close"
                    onClick={handleCloseClick}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default EndOfDayReport;
