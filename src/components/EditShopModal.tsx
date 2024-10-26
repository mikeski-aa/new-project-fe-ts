import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import "../styles/editshopmodal.css";

function EditShopModal({
  modal,
  setModal,
  storeName,
  storeLocation,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  storeName: string;
  storeLocation: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(storeName);
  const [location, setLocation] = useState<string>(storeLocation);

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
  const handleSaveClick = async () => {};

  const handleCancelClick = (): void => {
    setModal(false);
  };

  return (
    <div className={modal ? "editmodal show" : "editmodal hide"}>
      <div className="editContainer">
        <div className="deleteText">Would you like to delete:</div>
        <div className="editModalInputContainer">
          <input
            className="editModalInput"
            value={name}
            onChange={(e) => handleNameInput(e)}
          ></input>
          <input
            className="editModalInput"
            value={location}
            onChange={(e) => handleLocationInput(e)}
          ></input>
        </div>
        {loading ? <h1>LOADING</h1> : null}
        <div className="deleteBtnContainer">
          <button className="editModBtn" onClick={() => handleSaveClick()}>
            Save
          </button>
          <button className="editModBtn" onClick={() => handleCancelClick()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
