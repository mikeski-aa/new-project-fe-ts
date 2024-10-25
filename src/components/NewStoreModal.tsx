import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from "react";
import "../styles/newstoremodal.css";
import { UserContext } from "../App";
import { getStores, postStore } from "../services/storeCalls";
import { IStore } from "../interfaces/userContextInterfaces";

function NewStoreModal({
  newStoreModal,
  setNewStoreModal,
}: {
  newStoreModal: boolean;
  setNewStoreModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [location, setLocation] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const userContext = useContext(UserContext);

  // click and input hanlders
  const handleNameInput = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setName(input.value);
  };

  const handleLocationInput = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setLocation(input.value);
  };

  const handleCloseClick = () => {
    setNewStoreModal(false);
  };

  const handleAddClick = async () => {
    // make sure usercontext is not null or undefined
    if (userContext.user) {
      setLoading(true);
      const response = await postStore(name, location, userContext.user.id);
      const newStores = await getStores(userContext.user.id);
      userContext.setStores(newStores as IStore[]);
      setLoading(false);
      setNewStoreModal(false);
    }
  };

  return (
    <div
      className={newStoreModal ? "newStoreModal show" : "newStoreModal hide"}
    >
      <div className="addNewStoreContainer">
        <div className="modalBtnContainer">
          <button className="modalBtn" onClick={handleCloseClick}>
            Close
          </button>
        </div>
        <div className="modalInputContainer">
          <div className="modalInputDiv">
            <input
              placeholder="Store name"
              className="modalInput"
              value={name}
              onChange={(e) => handleNameInput(e)}
            ></input>
          </div>
          <div className="modalInput">
            <input
              placeholder="Store Location"
              className="modalInput"
              value={location}
              onChange={(e) => handleLocationInput(e)}
            ></input>
          </div>
        </div>
        {loading ? <h1>LOADING...</h1> : null}
        <button className="modalBtn" onClick={() => handleAddClick()}>
          Create new store
        </button>
      </div>
    </div>
  );
}

export default NewStoreModal;
