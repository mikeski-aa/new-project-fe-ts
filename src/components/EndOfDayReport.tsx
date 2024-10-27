import { Dispatch, SetStateAction } from "react";
import "../styles/endofdayreport.css";
import { convertDate } from "../utils/dateConversion";

// when opened, the report should check if someone has already upload EOD sales
function EndOfDayReport({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const dateToday = convertDate();

  const handleCloseClick = () => {
    setModal(false);
  };

  return (
    <div className={modal ? "eodModal show" : "eodModal hide"}>
      <div className="eodMainContainer">
        <button className="eodModalBtn" onClick={handleCloseClick}>
          Close
        </button>
        <div className="reportHeading">{`Add sale items for ${dateToday}`}</div>

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
