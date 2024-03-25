import { useContext } from "react";
import { FilterContext } from "@/contexts/FilterContext";

const ByDate = () => {
  const { sortByDate } = useContext(FilterContext);

  enum SortOrder {
    ASC = "ASC",
    DESC = "DESC",
  }

  return (
    <div>
      <span>SORT BY DATE</span>
      <div className="flex w-full justify-between">
        <button onClick={() => sortByDate(SortOrder.ASC)}>Asc</button>
        <button onClick={() => sortByDate(SortOrder.DESC)}>Desc</button>
      </div>
    </div>
  );
};

export default ByDate;
