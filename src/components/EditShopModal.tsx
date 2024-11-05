import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from "react";
import "../styles/editshopmodal.css";
import { getStores, updateStore } from "../services/storeCalls";
import { UserContext } from "../App";
import { IStore } from "../interfaces/userContextInterfaces";

function EditShopModal({
  modal,
  setModal,
  store,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;

  store: IStore;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(store.name);
  const [location, setLocation] = useState<string>(store.location);
  const userContext = useContext(UserContext);

  // handle input change
  const handleNameInput = (e: SyntheticEvent) => {
    const newName = e.target as HTMLInputElement;
    setName(newName.value);
  };

  const handleLocationInput = (e: SyntheticEvent) => {
    const newLocation = e.target as HTMLInputElement;
    setLocation(newLocation.value);
  };

  // handle button clicks
  const handleSaveClick = async () => {
    setLoading(true);
    if (userContext.user) {
      const response = await updateStore(
        userContext.user.id as number,
        store.id,
        name,
        location
      );
    }

    // get data from DB to refresh the main page here

    if (userContext.user) {
      const newStores = await getStores(userContext.user.id);
      if (newStores.stores && !newStores.errorPresent) {
        userContext.setStores(newStores.stores);
        setLoading(false);
        setModal(false);
      }
    }
  };

  const handleCancelClick = (): void => {
    setModal(false);
  };

  return (
    <div className={modal ? "editmodal show" : "editmodal hide"}>
      <div className="editContainer">
        {loading ? (
          <h1 className="loadingEdit">Saving store edit</h1>
        ) : (
          <>
            <div className="deleteText">Edit store info</div>
            <div className="editModalInputContainer">
              <div className="inputCont">
                <label className="inputLabelEdit">Store name</label>
                <input
                  className="editModalInput"
                  value={name}
                  onChange={(e) => handleNameInput(e)}
                  maxLength={30}
                  minLength={1}
                ></input>
              </div>
              <div className="inputCont">
                <label className="inputLabelEdit">Store location</label>
                <input
                  className="editModalInput"
                  value={location}
                  onChange={(e) => handleLocationInput(e)}
                  maxLength={30}
                  minLength={1}
                ></input>
              </div>
            </div>

            <div className="deleteBtnContainer">
              <button
                className="editModBtn save"
                onClick={() => handleSaveClick()}
              >
                Save
              </button>
              <button
                className="editModBtn cancel"
                onClick={() => handleCancelClick()}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EditShopModal;
