import { useContext, useEffect, useState } from "react";
import "../styles/home.css";
import { UserContext } from "../App";
import { getStores } from "../services/storeCalls";
import { IStore } from "../interfaces/userContextInterfaces";
import StoreHolder from "../components/StoreHolder";
import NewStoreModal from "../components/NewStoreModal";

function Home() {
  const userContext = useContext(UserContext);
  const [newStoreModal, setNewStoreModal] = useState<boolean>(false);

  // we probably want to fetch the stores, number of items and maybe stock value - but that's it
  // fetching entire product line here is too much
  useEffect(() => {
    const fetchStores = async () => {
      if (userContext.user) {
        const response = await getStores(userContext?.user?.id);
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
        Add new store
      </button>
      <div className="homeStoreContainer">
        {userContext.stores
          ? userContext.stores.map((item: IStore, index: number) => (
              <StoreHolder key={index} store={item} />
            ))
          : null}
      </div>
    </div>
  );
}

export default Home;
