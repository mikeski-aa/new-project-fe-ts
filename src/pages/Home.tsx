import { useContext, useEffect } from "react";
import "../styles/home.css";
import { UserContext } from "../App";
import { getBudgets } from "../services/budgetCalls";
import { IBudget } from "../App";

function Home() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchBudgets = async () => {
      // putting ? returns undefined instead of throwing errors if values are unavailable
      const response = await getBudgets(userContext?.user?.id);
      console.log(response);

      userContext.setBudget(response as IBudget[]);
    };
    fetchBudgets();
  }, []);

  return (
    <div className="homepageContent">
      <h1>Your budgets</h1>
      <div className="homeBudgetContainer">
        <div className="budgetCard">Weekly budget</div>
        {userContext?.budget?.map((item, index) => (
          <div key={index} className="budgetItem">
            <div className="budgetName">{item.name}</div>
            <div className="budgetMax">{item.budgetValue}</div>
            <div className="budgetPeriod">{item.interval}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
