import { Dispatch, SetStateAction } from "react";
import "../styles/endofdayreport.css";

function EndOfDayReport({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const date = new Date();

  const handleCloseClick = () => {
    setModal(false);
  };

  return (
    <div className={modal ? "eodModal show" : "eodModal hide"}>
      <div className="eodMainContainer">
        <div className="reportHeading">{`Add sale items for ${date}`}</div>
        <button className="eodModalBtn" onClick={handleCloseClick}>
          Close
        </button>
        <div className="itemSearchContainer">
          <label>Search item by name or SKU</label>
          <input
            className="itemSearchInput"
            type="string"
            placeholder="Name or SKU"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default EndOfDayReport;
