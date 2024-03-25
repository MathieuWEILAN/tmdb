import { useContext } from "react";
import { FilterContext } from "@/contexts/FilterContext";

const ByPopularity = () => {
  const { sortByPopularity } = useContext(FilterContext);

  enum SortOrder {
    ASC = "ASC",
    DESC = "DESC",
  }

  return (
    <div>
      <span>BY POPULARITY</span>
      <div className="flex w-full justify-between">
        <button onClick={() => sortByPopularity(SortOrder.ASC)}>Asc</button>
        <button onClick={() => sortByPopularity(SortOrder.DESC)}>Desc</button>
      </div>
    </div>
  );
};

export default ByPopularity;
