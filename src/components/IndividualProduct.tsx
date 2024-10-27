import { Dispatch, SetStateAction } from "react";
import { IProduct, IStore } from "../interfaces/userContextInterfaces";
import { deleteProduct } from "../services/productCalls";
import "../styles/individualproduct.css";
import { getStore } from "../services/storeCalls";
import { extractStore } from "../utils/storeUpdateHelper";

function IndividualProduct({
  product,
  storeid,
  setCurrentStore,
}: {
  product: IProduct;
  storeid: number;
  setCurrentStore: Dispatch<SetStateAction<IStore>>;
}) {
  const currency: string = "$";

  const handleRemoveClick = async () => {
    const response = await deleteProduct(product.id);
    const store = await getStore(storeid);
    extractStore(store, setCurrentStore);
  };

  return (
    <div className="productContainer">
      <div className="skuProd">{product.sku}</div>
      <div className="nameProd">{product.name}</div>
      <div className="categoryProd">{product.category}</div>
      <div className="priceProd">
        {currency}
        {product.price}
      </div>
      <div className="stockProd">{product.quantity}</div>
      <button className="remItem" onClick={handleRemoveClick}>
        Remove from store
      </button>
    </div>
  );
}

export default IndividualProduct;
