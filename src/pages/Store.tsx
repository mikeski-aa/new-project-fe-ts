import { useParams } from "react-router-dom";
import "../styles/store.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { IProduct, IStore } from "../interfaces/userContextInterfaces";

function Store() {
  const userContext = useContext(UserContext);
  const { paramsId } = useParams();

  useEffect(() => {
    const shallowCopy = userContext.stores
      ? [...userContext.stores]
      : undefined;

    console.log("shallow copy");
    console.log(shallowCopy);
    // console.log(filteredArray);

    console.log(userContext.stores);
    console.log("xd");
  }, []);

  return (
    <div className="storePageContainer">
      <h1 className="storeName">Placeholder name</h1>
      <div className="store items">Placeholder items</div>
    </div>
  );
}

export default Store;
