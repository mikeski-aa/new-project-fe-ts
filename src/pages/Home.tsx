import { useContext } from "react";
import useRedirectHook from "../hooks/useRedierctHook";
import "../styles/home.css";
import { UserContext } from "../App";

function Home() {
  const userContext = useContext(UserContext);

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
