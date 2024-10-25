import "../styles/newstoremodal.css";

function NewStoreModal({ newStoreModal }: { newStoreModal: boolean }) {
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
            <input placeholder="" className="modalInput"></input>
          </div>
          <div className="modalInput">
            <input placeholder="" className="modalInput"></input>
          </div>
        </div>
        <button className="modalBtn">Add </button>
      </div>
    </div>
  );
}

export default NewStoreModal;
