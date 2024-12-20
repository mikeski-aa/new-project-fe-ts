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
import {
  assignYearToMonth,
  getMonthsFromReports,
  IYearArrayHolder,
} from "../utils/reportConversions";
import ReportCalendarHolderComp from "../components/ReportCalendarHolderComp";
import OrderItems from "../components/OrderItems";

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
  const [reportYearArray, setReportYearArray] = useState<IYearArrayHolder[]>(
    []
  );
  const { id } = useParams<{ id: string }>();
  const [orderItemsModal, setOrderItemsModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getSpecificStore = async () => {
      if (id) {
        setLoading(true);
        const storeResponse = await getStore(id);

        setLoading(false);
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
    setReportYearArray(
      assignYearToMonth(getMonthsFromReports(currentStore.reports))
    );
    setShowItems(false);
    setShowReports(true);
  };

  const handleShowItems = () => {
    setShowReports(false);
    setShowItems(true);
  };

  const handleOrderItems = () => {
    setOrderItemsModal(true);
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
        currentStore={currentStore}
      />
      <OrderItems
        modal={orderItemsModal}
        setModal={setOrderItemsModal}
        currentStore={currentStore}
      />
      <h1 className="storeName">
        {currentStore ? currentStore.name : "Loading"}
      </h1>
      <div
        className={
          dailyReport ? "dailyReport yPresent" : "dailyReport nPresent"
        }
      >
        {dailyReport ? "Daily report uploaded" : "Daily report not uploaded"}
      </div>
      <div className="buttonContainerStore">
        {" "}
        <button
          className={showItems ? `addItemsBtn active` : `addItemsBtn`}
          onClick={handleShowItems}
        >
          Show store items
        </button>
        <button
          className={showReports ? `addItemsBtn active` : `addItemsBtn`}
          onClick={handleOpenReportHistory}
        >
          View previous reports
        </button>
        <button className="addItemsBtn" onClick={handleOpenNewItemModal}>
          Add items to stock
        </button>
        <button className="addItemsBtn" onClick={handleOpenEodModal}>
          Generate EOD report
        </button>
        <button className="addItemsBtn" onClick={handleOrderItems}>
          Order items
        </button>
      </div>

      {loading ? (
        <div
          className={
            loading ? "loadingStoreStatus show" : "loadingStoreStatus hide"
          }
        >
          Loading store information...
        </div>
      ) : (
        <>
          {" "}
          <div className={showItems ? "storeItems show" : "storeItems hide"}>
            {currentStore.products.length == 0 && !loading ? (
              <div className="emptyMessage">
                No items added to stock for this store
              </div>
            ) : (
              <div className="storeHeadings">
                <div className="headingDivItemStore">SKU</div>
                <div className="headingDivItemStore">Name</div>
                <div className="headingDivItemStore">Category</div>
                <div className="headingDivItemStore">Price</div>
                <div className="headingDivItemStore">Purchase price</div>
                <div className="headingDivItemStore">Quantity</div>
                <div className="headingDivItemStoreLast"></div>
              </div>
            )}

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
          <div
            className={showReports ? "storeReports show" : "storeReports hide"}
          >
            {reportYearArray.length == 0 && !loading ? (
              <div className="emptyMessage">
                No reports found for this store
              </div>
            ) : null}
            <div className="monthContainer">
              <ReportCalendarHolderComp yearArray={reportYearArray} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Store;
