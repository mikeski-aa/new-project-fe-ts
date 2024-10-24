import { useContext, useEffect } from "react";
import "../styles/home.css";
import { UserContext } from "../App";
import { getStores } from "../services/storeCalls";
import { IStore } from "../interfaces/userContextInterfaces";
import StoreHolder from "../components/StoreHolder";

function Home() {
  const userContext = useContext(UserContext);

  // we probably want to fetch the stores, number of items and maybe stock value - but that's it
  // fetching entire product line here is too much
  useEffect(() => {
    const fetchStores = async () => {
      // putting ? returns undefined instead of throwing errors if values are unavailable
      const response = await getStores(userContext?.user?.id);
      console.log(response);

      userContext.setStores(response as IStore[]);
    };
    fetchStores();
  }, []);

  return (
    <div className="homepageContent">
      <h1>Your Stores</h1>
      <div className="homeStoreContainer">
        {userContext?.stores?.map((item, index) => (
          <StoreHolder key={index} store={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
