import "../styles/storeholder.css";

function StoreHolder({
  storeName,
  storeLocation,
}: {
  storeName: string;
  storeLocation: string;
}) {
  return (
    <div className="budgetContainer">
      <div className="budgetHeading">{storeName}</div>
      <div className="budgetValue">{storeLocation}</div>
      <div className="transactionHolder"></div>
    </div>
  );
}

export default StoreHolder;
