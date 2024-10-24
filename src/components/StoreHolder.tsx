import { IStore } from "../interfaces/userContextInterfaces";
import "../styles/storeholder.css";
import IndividualProduct from "./IndividualProduct";

function StoreHolder({ store }: { store: IStore }) {
  return (
    <div className="budgetContainer">
      <div className="budgetHeading">{store.name}</div>
      <div className="budgetValue">{store.location}</div>
      <div className="productHolder">
        {store.products.map((product, index) => (
          <IndividualProduct key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default StoreHolder;
