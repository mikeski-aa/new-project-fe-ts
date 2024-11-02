import "../styles/finance.css";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";
import { getOrdersForStore } from "../services/orderCalls";

function Finance() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    console.log(userContext.stores);
  }, [userContext.stores]);

  const handleStoreClick = async (id: number) => {
    await getOrdersForStore(id);
  };

  return (
    <div className="financeContainer">
      <div className="something">
        <h1>Finance</h1>
        <div className="buttonHolder">
          {userContext
            ? userContext?.stores.map((store, index) => (
                <button
                  key={index}
                  className={`finStoreBtn`}
                  onClick={() => handleStoreClick(store.id)}
                >
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
