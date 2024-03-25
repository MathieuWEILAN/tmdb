import { useContext } from "react";
import { FilterContext } from "@/contexts/FilterContext";

const ByRate = () => {
  const { sortByRate } = useContext(FilterContext);

  enum SortOrder {
    ASC = "ASC",
    DESC = "DESC",
  }

  return (
    <div>
      <span>SORT BY RATE</span>
      <div className="flex w-full justify-between">
        <button onClick={() => sortByRate(SortOrder.ASC)}>ASC</button>
        <button onClick={() => sortByRate(SortOrder.DESC)}>Desc</button>
      </div>
    </div>
  );
};

export default ByRate;
