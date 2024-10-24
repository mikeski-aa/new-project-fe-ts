import { useNavigate } from "react-router-dom";
import { IStore } from "../interfaces/userContextInterfaces";
import "../styles/storeholder.css";
import IndividualProduct from "./IndividualProduct";

function StoreHolder({ store }: { store: IStore }) {
  const navigate = useNavigate();

  const handleOpenClick = () => {
    navigate(`/store/${store.id}`);
  };
  return (
    <div className="storeContainer">
      <div className="budgetHeading">{store.name}</div>
      <img src={store.picture} className="storePicture"></img>
      <div className="budgetValue">{store.location}</div>
      <div className="productHolder">
        Unique products in store: {store.products.length}
        {/* {store.products.map((product, index) => (
          <IndividualProduct key={index} product={product} />
        ))} */}
      </div>
      <div className="storeButtons">
        <button className="storeBtn" onClick={handleOpenClick}>
          Open
        </button>
        <button className="storeBtn">Edit</button>
        <button className="storeBtn">Delete</button>
      </div>
    </div>
  );
}

export default StoreHolder;
