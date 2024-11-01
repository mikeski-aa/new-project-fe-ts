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
      await postStore(name, location, userContext.user.id);
      const newStores = await getStores(userContext.user.id);

      if (!newStores.errorPresent && newStores.stores) {
        userContext.setStores(newStores.stores);
        setLoading(false);
        setNewStoreModal(false);
      }
    }
  };

  return (
    <div
      className={newStoreModal ? "newStoreModal show" : "newStoreModal hide"}
    >
      <div className="addNewStoreContainer">
        <div className="modalBtnContainer"></div>
        <div className="modalInputContainer">
          <div className="inputCont">
            <label className="inputLabelEdit">Store name</label>
            <input
              placeholder="Store name"
              className="modalInput"
              value={name}
              onChange={(e) => handleNameInput(e)}
            ></input>
          </div>
          <div className="inputCont">
            <label className="inputLabelEdit">Store location</label>
            <input
              placeholder="Store Location"
              className="modalInput"
              value={location}
              onChange={(e) => handleLocationInput(e)}
            ></input>
          </div>
        </div>
        {loading ? <h1>LOADING...</h1> : null}
        <div className="deleteBtnContainer">
          <button
            className="modalBtn newstore"
            onClick={() => handleAddClick()}
          >
            Create new store
          </button>
          <button
            className="modalBtn newstore cancel"
            onClick={handleCloseClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewStoreModal;
