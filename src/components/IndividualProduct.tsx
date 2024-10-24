import "../styles/individualproduct.css";

function IndividualProduct({
  sku,
  name,
  category,
  price,
  stock,
}: {
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}) {
  return (
    <div className="productContainer">
      <div className="skuProd"></div>
      <div className="nameProd"></div>
      <div className="categoryProd"></div>
      <div className="priceProd"></div>
      <div className="stockProd"></div>
    </div>
  );
}
