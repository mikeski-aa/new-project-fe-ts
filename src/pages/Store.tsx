import { useLocation, useParams } from "react-router-dom";
import "../styles/store.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { IProduct, IStore } from "../interfaces/userContextInterfaces";
import IndividualProduct from "../components/IndividualProduct";
import { getStore, IError, IStoreResponse } from "../services/storeCalls";
import AddItemStockModal from "../components/AddItemStockModal";
import { extractStore } from "../utils/storeUpdateHelper";

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
  const userContext = useContext(UserContext);
  const { id } = useParams<{ id: string }>();

  // type guard for types
  // this type guard will take the response argument, which can be IStoerResponse or IError.
  // if the response is of type IStoreResponse it will return the !response.error
  // this can be used in an If statement to evaluate how to proceed depending on resulting data.
  //  function isStoreResponse(
  //     response: IStoreResponse | IError
  //   ): response is IStoreResponse {
  //     return !response.error;
  //   }

  useEffect(() => {
    const getSpecificStore = async () => {
      if (id) {
        const storeResponse = await getStore(id);
        extractStore(storeResponse, setCurrentStore);

        // error is not present so data can be assigned

        //   if (isStoreResponse(storeResponse)) {
        //     const store: IStore = {
        //       id: storeResponse.id,
        //       userId: storeResponse.userId,
        //       name: storeResponse.name,
        //       products: storeResponse.products,
        //       location: storeResponse.location,
        //       picture: storeResponse.picture,
        //     };
        //     setCurrentStore(store);
        //     console.log(storeResponse);
        //   } else {
        //     console.log(storeResponse.resTest);
        //   }
      }
    };
    getSpecificStore();
  }, []);

  const handleOpenNewItemModal = () => {
    setAddItemModal(true);
  };

  return (
    <div className="storePageContainer">
      <AddItemStockModal
        modal={addItemModal}
        setModal={setAddItemModal}
        currentStore={currentStore}
        setCurrentStore={setCurrentStore}
      />
      <h1 className="storeName">
        {currentStore ? currentStore.name : "Loading"}
      </h1>
      <button className="addItemsBtn" onClick={handleOpenNewItemModal}>
        Add items to stock
      </button>
      <div className="store items">
        {currentStore?.products
          ? currentStore.products.map((product, index) => (
              <IndividualProduct key={index} product={product} />
            ))
          : null}
      </div>
    </div>
  );
}

export default Store;
