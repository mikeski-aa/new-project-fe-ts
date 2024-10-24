import { useParams } from "react-router-dom";
import "../styles/store.css";

function Store() {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="storePageContainer">
      <h1 className="storeName">Placeholder name</h1>
      <div className="store items">Placeholder items</div>
    </div>
  );
}

export default Store;
