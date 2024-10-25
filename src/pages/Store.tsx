import { useLocation, useParams } from "react-router-dom";
import "../styles/store.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { IProduct, IStore } from "../interfaces/userContextInterfaces";
import IndividualProduct from "../components/IndividualProduct";
import { getStore, IError } from "../services/storeCalls";

function Store() {
  const [currentStore, setCurrentStore] = useState<IStore>();
  const userContext = useContext(UserContext);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getSpecificStore = async () => {
      if (id) {
        const test = await getStore(id);

        // error is not present so data can be assigned
        if (!test.error) {
          const store: IStore = {
            id: test.id,
            userId: test.userId,
            name: test.name,
            products: test.products,
            location: test.location,
            picture: test.picture,
          };
          setCurrentStore(store);
          console.log(test);
        }
      }
    };
    getSpecificStore();
  }, []);

  return (
    <div className="storePageContainer">
      <h1 className="storeName">{id}</h1>
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
