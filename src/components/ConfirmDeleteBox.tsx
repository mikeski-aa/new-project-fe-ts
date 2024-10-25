import { Dispatch, SetStateAction, useContext } from "react";
import "../styles/confirmdeletebox.css";
import { IStore } from "../interfaces/userContextInterfaces";
import { deleteStore } from "../services/storeCalls";
import { UserContext } from "../App";

function ConfirmDeleteBox({
  modal,
  setModal,
  store,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  store: IStore;
}) {
  const userContext = useContext(UserContext);
  const handleCancelClick = () => {
    setModal(false);
  };

  const handleConfirmClick = async () => {
    const response = await deleteStore(
      userContext?.user?.id as number,
      store.id as number
    );
  };

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
