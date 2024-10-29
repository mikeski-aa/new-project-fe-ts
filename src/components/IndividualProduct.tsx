import { Dispatch, SetStateAction, useState } from "react";
import { IProduct, IStore } from "../interfaces/userContextInterfaces";
import "../styles/individualproduct.css";
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
  //TODO: Replace with someting else that can be changed depending on currency req.
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
      <div className="purchasePriceProd">
        {currency}
        {product.purchasePrice}
      </div>
      <div className="stockProd">{product.quantity}</div>
      <button className="remItem" onClick={handleRemoveClick}>
        Remove from store
      </button>
    </div>
  );
}

export default IndividualProduct;
