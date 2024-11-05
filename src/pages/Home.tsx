import { useContext, useEffect, useState } from "react";
import "../styles/home.css";
import { UserContext } from "../App";
import { getStores } from "../services/storeCalls";
import { IStore } from "../interfaces/userContextInterfaces";
import StoreHolder from "../components/StoreHolder";
import NewStoreModal from "../components/NewStoreModal";
import PlusCircle from "../assets/pluscircle.svg?react";

function Home() {
  const userContext = useContext(UserContext);
  const [newStoreModal, setNewStoreModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // we probably want to fetch the stores, number of items and maybe stock value - but that's it
  // fetching entire product line here is too much
  useEffect(() => {
    const fetchStores = async () => {
      if (userContext.user) {
        setLoading(true);
        const response = await getStores(userContext?.user?.id);
        setLoading(false);
        console.log(response.stores);

        if (!response.errorPresent && response.stores) {
          userContext.setStores(response.stores);
        }
      }
    };
    fetchStores();
  }, []);

  const handleNewStoreModal = () => {
    if (!newStoreModal) {
      setNewStoreModal(true);
    }
  };

  return (
    <div className="homepageContent">
      <NewStoreModal
        newStoreModal={newStoreModal}
        setNewStoreModal={setNewStoreModal}
      />
      <h1 className="pageHeading">Your Stores</h1>
      <button className="createNewStoreBtn" onClick={handleNewStoreModal}>
        <PlusCircle className="icontest" style={{ fill: "rgb(190, 38, 38)" }} />
        <div className="btnTextAdd"> Add new store</div>
      </button>
      {loading ? (
        <div
          className={
            loading ? "loadingContentHome show" : "loadingContentHome hide"
          }
        >
          Loading store information...
        </div>
      ) : (
        <div className="homeStoreContainer">
          {userContext.stores ? (
            userContext.stores.length < 1 ? (
              <div>You current don't have any stores to show!</div>
            ) : null
          ) : null}
          {userContext.stores
            ? userContext.stores.map((item: IStore, index: number) => (
                <StoreHolder key={index} store={item} />
              ))
            : null}
        </div>
      )}
    </div>
  );
}

export default Home;
