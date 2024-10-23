import { useContext, useEffect } from "react";
import "../styles/home.css";
import { UserContext } from "../App";
import { getBudgets } from "../services/budgetCalls";

function Home() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchBudgets = async () => {
      // putting ? returns undefined instead of throwing errors if values are unavailable
      const response = await getBudgets(userContext?.user?.id);
      console.log(response);
      userContext.setBudget(response);
    };
    fetchBudgets();
  }, []);

  return (
    <div className="homepageContent">
      <h1>Your budgets</h1>
      <div className="homeBudgetContainer">
        <div className="budgetCard">Weekly budget</div>
        <div className="budgetCard">Monthly budget</div>
        <div className="budgetCard">Annual budget</div>
      </div>
    </div>
  );
}

export default Home;
