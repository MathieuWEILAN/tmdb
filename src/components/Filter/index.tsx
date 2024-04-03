import RateRange from "./RateRange";
import ByCategories from "./ByCategories";
import YearRange from "./YearRange";
import FilterIcon from "@/assets/icons/FilterIcon";
import SortBy from "./SortBy";
import { useContext, useState } from "react";
import { FilterContext } from "@/contexts/FilterContext";
import { TypeOfObj } from "@/models/types";

enum TypeSort {
  RATE = "rate",
  DATE = "date",
  NAME = "name",
  NULL = "NULL",
}
const Filter: React.FC = () => {
  const [isFilter, setIsFilter] = useState<boolean>(true);
  const [type, setType] = useState<TypeSort>(TypeSort.NULL);
  const handleFilter = () => {
    setIsFilter(!isFilter);
  };

  const { sortByDate, sortByRate, sortByName } = useContext(FilterContext);
  return (
    <section className="h-auto rounded-xl box-shadow-2 w-full lg:w-72 sticky top-[100px] p-4 mt-8 lg:mt-0 bg-zinc-50">
      <FilterIcon className="lg:hidden" onClick={handleFilter} />
      <div
        className={`${
          isFilter ? "max-h-screen p-2" : "max-h-0"
        } lg:block transition-all duration-500 ease-in-out lg:max-h-full overflow-hidden space-y-4`}
      >
        <SortBy
          title={"rate"}
          onClick={sortByRate}
          type={type}
          handleType={() => setType(TypeSort.RATE)}
        />
        <SortBy
          title={"date"}
          onClick={sortByDate}
          type={type}
          handleType={() => setType(TypeSort.DATE)}
        />
        <SortBy
          title={"name"}
          onClick={sortByName}
          type={type}
          handleType={() => setType(TypeSort.NAME)}
        />
        <RateRange />
        <ByCategories />
        <YearRange />
      </div>
    </section>
  );
};

export default Filter;
