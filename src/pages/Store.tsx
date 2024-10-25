import { useLocation, useParams } from "react-router-dom";
import "../styles/store.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { IProduct, IStore } from "../interfaces/userContextInterfaces";
import IndividualProduct from "../components/IndividualProduct";
import { getStore } from "../services/storeCalls";

function Store() {
  const [currentStore, setCurrentStore] = useState<IStore[]>();
  const userContext = useContext(UserContext);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const shallowCopy = userContext.stores
        ? [...userContext.stores]
        : undefined;
      const paramId: number = +id;
      const filteredArray = shallowCopy?.filter((item) => item.id == paramId);
      console.log(filteredArray ? filteredArray[0] : null);
      setCurrentStore(filteredArray);

      const test = getStore(id);
      console.log(test);
    }
  }, []);

  return (
    <div className="storePageContainer">
      <h1 className="storeName">{id}</h1>
      <div className="store items">
        {/* {currentStore
          ? currentStore[0].products.map((product, index) => (
              <IndividualProduct key={index} product={product} />
            ))
          : null} */}
      </div>
    </div>
  );
}

export default Store;
