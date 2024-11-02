import "../styles/finance.css";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";

function Finance() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    console.log(userContext.stores);
  }, []);

  return (
    <div className="financeContainer">
      <div className="something">
        <h1>Finance</h1>
        <div className="buttonHolder">
          {userContext
            ? userContext?.stores.map((store, index) => (
                <button key={index} className={`finStoerBtn`}>
                  {store.name}
                </button>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Finance;
