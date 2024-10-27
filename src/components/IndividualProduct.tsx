import { Dispatch, SetStateAction, useState } from "react";
import { IProduct, IStore } from "../interfaces/userContextInterfaces";
import { deleteProduct } from "../services/productCalls";
import "../styles/individualproduct.css";
import { getStore } from "../services/storeCalls";
import { extractStore } from "../utils/storeUpdateHelper";
import ConfirmDeleteProduct from "./ConfirmDeleteProduct";

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
  const [modal, setModal] = useState<boolean>(false);

  const handleRemoveClick = async () => {
    setModal(true);
  };

  return (
    <div className="productContainer">
      <ConfirmDeleteProduct
        modal={modal}
        setModal={setModal}
        product={product}
        storeid={storeid}
        setCurrentStore={setCurrentStore}
      />
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
