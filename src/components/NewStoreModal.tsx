import { SyntheticEvent, useState } from "react";
import "../styles/newstoremodal.css";

function NewStoreModal({ newStoreModal }: { newStoreModal: boolean }) {
  const [location, setLocation] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleNameInput = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setName(input.value);
  };

  const handleLocationInput = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setLocation(input.value);
  };

  return (
    <div
      className={newStoreModal ? "newStoreModal show" : "newStoreModal hide"}
    >
      <div className="addNewStoreContainer">
        <div className="modalBtnContainer">
          <button className="modalBtn">Close</button>
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
        <button className="modalBtn">Create new store</button>
      </div>
    </div>
  );
}

export default NewStoreModal;
