import { useParams } from "react-router-dom";
import "../styles/store.css";
import { useEffect, useState } from "react";
import { IStore } from "../interfaces/userContextInterfaces";
import IndividualProduct from "../components/IndividualProduct";
import { getStore } from "../services/storeCalls";
import AddItemStockModal from "../components/AddItemStockModal";
import { dailyReportCheck } from "../utils/storeUpdateHelper";
import EndOfDayReport from "../components/EndOfDayReport";
import { filterProducts } from "../utils/eodStateUtils";
import { getMonthsFromReports } from "../utils/reportConversions";

function Store() {
  const [currentStore, setCurrentStore] = useState<IStore>({
    id: 0,
    userId: 0,
    name: "",
    products: [],
    location: "",
    picture: "",
    reports: [],
  });
  const [addItemModal, setAddItemModal] = useState<boolean>(false);
  const [eodModal, setEodModal] = useState<boolean>(false);
  const [dailyReport, setDailyReport] = useState<boolean>(false);
  const [showItems, setShowItems] = useState<boolean>(true);
  const [showReports, setShowReports] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getSpecificStore = async () => {
      if (id) {
        const storeResponse = await getStore(id);
        console.log(storeResponse);

        if (!storeResponse.errorPresent && storeResponse.store) {
          setCurrentStore(storeResponse.store);
          dailyReportCheck(storeResponse.store, setDailyReport);
        }
      }
    };
    getSpecificStore();
  }, []);

  const handleOpenNewItemModal = (): void => {
    setAddItemModal(true);
  };

  const handleOpenEodModal = (): void => {
    setEodModal(true);
  };

  const handleOpenReportHistory = () => {
    setShowItems(false);
    setShowReports(true);
    getMonthsFromReports(currentStore.reports);
  };

  const handleShowItems = () => {
    setShowReports(false);
    setShowItems(true);
  };

  return (
    <div className="storePageContainer">
      <AddItemStockModal
        modal={addItemModal}
        setModal={setAddItemModal}
        currentStore={currentStore}
        setCurrentStore={setCurrentStore}
      />
      <EndOfDayReport
        modal={eodModal}
        setModal={setEodModal}
        products={filterProducts(currentStore.products)}
        storeId={currentStore.id}
        setCurrentStore={setCurrentStore}
        dailyReport={dailyReport}
        setDailyReport={setDailyReport}
      />
      <h1 className="storeName">
        {currentStore ? currentStore.name : "Loading"}
      </h1>
      <div
        className={
          dailyReport ? "dailyReport yPresent" : "dailyReport nPresent"
        }
      >
        {dailyReport ? "daily report uploaded" : "daily report not uploaded"}
      </div>
      <div className="buttonContainerStore">
        {" "}
        <button className="addItemsBtn" onClick={handleShowItems}>
          Show store items
        </button>
        <button className="addItemsBtn" onClick={handleOpenReportHistory}>
          View previous reports
        </button>
        <button className="addItemsBtn" onClick={handleOpenNewItemModal}>
          Add items to stock
        </button>
        <button className="addItemsBtn" onClick={handleOpenEodModal}>
          Generate EOD report
        </button>
      </div>

      <div className={showItems ? "storeItems show" : "storeItems hide"}>
        <div className="storeHeadings">
          <div className="headingDivItem">SKU</div>
          <div className="headingDivItem">Name</div>
          <div className="headingDivItem">Category</div>
          <div className="headingDivItem">Price</div>
          <div className="headingDivItem">Purchase price</div>
          <div className="headingDivItem">Quantity</div>
        </div>
        <div className="individualProductStoreContainer">
          {currentStore?.products
            ? currentStore.products.map((product, index) => (
                <IndividualProduct
                  key={index}
                  product={product}
                  storeid={currentStore.id}
                  setCurrentStore={setCurrentStore}
                />
              ))
            : null}
        </div>
      </div>
      <div className={showReports ? "storeReports show" : "storeReports hide"}>
        <div className="monthContainer">
          {" "}
          {currentStore.reports
            ? currentStore.reports.map((item, index) => (
                <div key={index}>{item.id}</div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Store;
