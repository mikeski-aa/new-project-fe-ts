import { Dispatch, SetStateAction, useState } from "react";
import { IProduct, IStore } from "../interfaces/userContextInterfaces";
import { deleteProduct } from "../services/productCalls";
import { getStore } from "../services/storeCalls";
import { extractStore } from "../utils/storeUpdateHelper";

function ConfirmDeleteProduct({
  modal,
  setModal,
  product,
  storeid,
  setCurrentStore,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
  storeid: number;
  setCurrentStore: Dispatch<SetStateAction<IStore>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirmClick = async () => {
    setLoading(true);
    const response = await deleteProduct(product.id);
    const store = await getStore(storeid);
    extractStore(store, setCurrentStore);
    setModal(false);
    setLoading(false);
  };

  const handleCancelClick = () => {
    setModal(false);
  };

  return (
    <div className={modal ? "deleteItemModal show" : "deleteItemModal hide"}>
      <div className="deleteItemConfirm">
        <div className="deleteText">Would you like to delete:</div>
        <div className="deleteText second">{product ? product.name : null}</div>
        {loading ? <h1>LOADING</h1> : null}
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

export default ConfirmDeleteProduct;
