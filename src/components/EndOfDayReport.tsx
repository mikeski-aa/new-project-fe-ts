import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import "../styles/endofdayreport.css";
import { convertDate } from "../utils/dateConversion";
import { IProduct } from "../interfaces/userContextInterfaces";
import SearchResultItem from "./SearchResultItem";

// when opened, the report should check if someone has already upload EOD sales
function EndOfDayReport({
  modal,
  setModal,
  products,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  products: IProduct[];
}) {
  const [searchList, setSearchList] = useState<IProduct[]>([]);
  const [itemsSold, setItemsSold] = useState<IProduct[]>([]);
  const dateToday = convertDate();

  const handleCloseClick = () => {
    setModal(false);
  };

  // check difference between
  //   const target = e.target as HTMLInputElement;
  //   and
  //   const target:HTMLInputElement = e.target;
  const handleInputChange = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    const shallowProducts = [...products];
    const tempArray = [];

    if (target.value != "") {
      for (let x = 0; x < shallowProducts.length; x++) {
        if (shallowProducts[x].sku.includes(target.value.toUpperCase())) {
          tempArray.push(shallowProducts[x]);
        }
      }

      console.log(shallowProducts);
      setSearchList(tempArray);
    } else {
      setSearchList([]);
    }
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
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div className="searchResultContainer">
          {searchList.map((item, index) => (
            <SearchResultItem item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EndOfDayReport;
