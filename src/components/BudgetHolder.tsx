import "../styles/budgetholder.css";

function BudgetHolder(
  budgetHeading: string,
  budgetValue: number,
  budgetPeriod: string
) {
  return (
    <div className="budgetContainer">
      <div className="budgetHeading">{budgetHeading}</div>
      <div className="budgetValue">{budgetValue}</div>
      <div className="budgetPeriod">{budgetPeriod}</div>
      <div className="transactionHolder"></div>
    </div>
  );
}

export default BudgetHolder;
