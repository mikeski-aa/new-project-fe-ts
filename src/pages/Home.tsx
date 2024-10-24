import { useContext, useEffect } from "react";
import "../styles/home.css";
import { UserContext } from "../App";
import { getStores } from "../services/storeCalls";
import { IStore } from "../interfaces/userContextInterfaces";

function Home() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchBudgets = async () => {
      // putting ? returns undefined instead of throwing errors if values are unavailable
      const response = await getStores(userContext?.user?.id);
      console.log(response);

      userContext.setStores(response as IStore[]);
    };
    fetchBudgets();
  }, []);

  return (
    <div className="homepageContent">
      <h1>Your budgets</h1>
      <div className="homeBudgetContainer">
        <div className="budgetCard">Weekly budget</div>
      </div>
    </div>
  );
}

export default Home;
