import { useContext } from "react";
import { FilterContext } from "@/contexts/FilterContext";

const ByName = () => {
  const { sortByName } = useContext(FilterContext);

  enum SortOrder {
    ASC = "ASC",
    DESC = "DESC",
  }

  return (
    <div>
      <span>SORT BY NAME</span>
      <div className="flex w-full justify-between">
        <button onClick={() => sortByName(SortOrder.ASC)}>Asc</button>
        <button onClick={() => sortByName(SortOrder.DESC)}>Desc</button>
      </div>
    </div>
  );
};

export default ByName;
