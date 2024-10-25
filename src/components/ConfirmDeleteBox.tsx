import { Dispatch, SetStateAction } from "react";
import "../styles/confirmdeletebox.css";
import { IStore } from "../interfaces/userContextInterfaces";

function ConfirmDeleteBox({
  modal,
  setModal,
  store,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  store: IStore;
}) {
  const handleCancelClick = () => {
    setModal(false);
  };

  const handleConfirmClick = async () => {};
  return (
    <div className={modal ? "deletemodal show" : "deletemodal hide"}>
      <div className="deleteConfirmContainer">
        <div className="deleteText">Would you like to delete:</div>
        <div className="deleteText second">{store ? store.name : null}</div>
        <div className="deleteBtnContainer">
          <button className="delModBtn" onClick={() => handleConfirmClick()}>
            Confirm Delete
          </button>
          <button className="delModBtn" onClick={() => handleCancelClick()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteBox;
