import { Dispatch, SetStateAction, useContext, useState } from "react";
import "../styles/confirmdeletebox.css";
import { IStore } from "../interfaces/userContextInterfaces";
import { deleteStore, getStores } from "../services/storeCalls";
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
  const [loading, setLoading] = useState(false);

  const handleCancelClick = () => {
    setModal(false);
  };

  const handleConfirmClick = async () => {
    setLoading(true);
    await deleteStore(userContext?.user?.id as number, store.id as number);

    if (userContext.user) {
      const newStores = await getStores(userContext.user.id);

      if (!newStores.errorPresent && newStores.stores) {
        userContext.setStores(newStores.stores);
        setLoading(false);
        setModal(false);
      }
    }
  };

  return (
    <div className={modal ? "deletemodal show" : "deletemodal hide"}>
      <div className="deleteConfirmContainer">
        {loading ? (
          <h1>Deleting store...</h1>
        ) : (
          <>
            <div className="deleteText">Would you like to delete:</div>
            <div className="deleteText second">{store ? store.name : null}</div>

            <div className="deleteBtnContainer">
              <button
                className="delModBtn confirm"
                onClick={() => handleConfirmClick()}
              >
                Confirm Delete
              </button>
              <button
                className="delModBtn cancel"
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

export default ConfirmDeleteBox;
