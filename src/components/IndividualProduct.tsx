import { IProduct } from "../interfaces/userContextInterfaces";
import "../styles/individualproduct.css";

function IndividualProduct({ product }: { product: IProduct }) {
  const currency: string = "$";
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
      <button className="remItem">Remove from store</button>
    </div>
  );
}

export default IndividualProduct;
