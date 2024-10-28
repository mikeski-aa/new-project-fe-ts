import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import "../styles/endofdayreport.css";
import { convertDate } from "../utils/dateConversion";
import { IProduct } from "../interfaces/userContextInterfaces";
import SearchResultItem from "./SearchResultItem";
import IndividualSoldItem from "./IndividualSoldItem";

// when opened, the report should check if someone has already upload EOD sales
// if someone wants to override sale report, there needs to be extra step to confirm
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

    if (target.value != "") {
      const filteredArray = shallowProducts.filter((item) =>
        item.sku.includes(target.value.toUpperCase())
      );

      console.log(shallowProducts);
      setSearchList(filteredArray);
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
        <div className="soldContainer">
          {itemsSold.map((item, index) => (
            <IndividualSoldItem
              key={index}
              item={item}
              searchList={searchList}
              setSearchList={setSearchList}
              itemsSold={itemsSold}
              setItemsSold={setItemsSold}
            />
          ))}
        </div>
        <div className="itemSearchContainer">
          <label>Search item by SKU</label>
          <input
            className="itemSearchInput"
            type="string"
            placeholder="Name or SKU"
            onChange={(e) => handleInputChange(e)}
          ></input>
        </div>
        <div className="searchResultContainer">
          {searchList.map((item, index) => (
            <SearchResultItem
              item={item}
              key={index}
              itemsSold={itemsSold}
              setItemsSold={setItemsSold}
              currentItems={searchList}
              setCurrentItems={setSearchList}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EndOfDayReport;
