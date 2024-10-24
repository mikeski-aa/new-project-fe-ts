import { IStore } from "../interfaces/userContextInterfaces";
import "../styles/storeholder.css";
import IndividualProduct from "./IndividualProduct";

function StoreHolder({ store }: { store: IStore }) {
  return (
    <div className="storeContainer">
      <div className="budgetHeading">{store.name}</div>
      <div className="budgetValue">{store.location}</div>
      <div className="productHolder">
        Unique products in store: {store.products.length}
        {/* {store.products.map((product, index) => (
          <IndividualProduct key={index} product={product} />
        ))} */}
      </div>
      <div className="storeButtons">
        <button className="storeBtn">Open</button>
        <button className="storeBtn">Edit</button>
        <button className="storeBtn">Delete</button>
      </div>
    </div>
  );
}

export default StoreHolder;
