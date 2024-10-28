import { useLocation, useParams } from "react-router-dom";
import "../styles/store.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { IProduct, IStore } from "../interfaces/userContextInterfaces";
import IndividualProduct from "../components/IndividualProduct";
import { getStore, IError, IStoreResponse } from "../services/storeCalls";
import AddItemStockModal from "../components/AddItemStockModal";
import { extractStore } from "../utils/storeUpdateHelper";
import EndOfDayReport from "../components/EndOfDayReport";
import { filterProducts } from "../utils/eodStateUtils";

function Store() {
  const [currentStore, setCurrentStore] = useState<IStore>({
    id: 0,
    userId: 0,
    name: "",
    products: [],
    location: "",
    picture: "",
  });
  const [addItemModal, setAddItemModal] = useState<boolean>(false);
  const [eodModal, setEodModal] = useState<boolean>(false);
  const userContext = useContext(UserContext);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getSpecificStore = async () => {
      if (id) {
        const storeResponse = await getStore(id);
        extractStore(storeResponse, setCurrentStore);
      }
    };
    getSpecificStore();
  }, []);

  const handleOpenNewItemModal = () => {
    setAddItemModal(true);
  };

  const handleOpenEodModal = () => {
    setEodModal(true);
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
      />
      <h1 className="storeName">
        {currentStore ? currentStore.name : "Loading"}
      </h1>
      <div className="buttonContainerStore">
        {" "}
        <button className="addItemsBtn" onClick={handleOpenNewItemModal}>
          Add items to stock
        </button>
        <button className="addItemsBtn" onClick={handleOpenEodModal}>
          Generate EOD report
        </button>
      </div>

      <div className="store items">
        <div className="storeHeadings">
          <div className="headingDivItem">SKU</div>
          <div className="headingDivItem">Name</div>
          <div className="headingDivItem">Category</div>
          <div className="headingDivItem">Price</div>
          <div className="headingDivItem">Purchase price</div>
          <div className="headingDivItem">Quantity</div>
        </div>
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
  );
}

export default Store;
