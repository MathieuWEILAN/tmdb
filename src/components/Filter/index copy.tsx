import ByDate from "./ByDate";
import ByRate from "./ByRate";
import ByPopularity from "./ByPopularity";
import ByName from "./ByName";
import RateRange from "./RateRange";
import ByCategories from "./ByCategories";
import FilterIcon from "@/assets/icons/FilterIcon";
import { useState } from "react";

const Filter: React.FC = () => {
  const [isFilter, setIsFilter] = useState<boolean>(true);
  const handleFilter = () => {
    setIsFilter(!isFilter);
  };
  return (
    <section className="w-full lg:w-72 h-auto rounded-xl shadow-xl p-5 space-y-2.5">
      <FilterIcon className="lg:hidden" onClick={handleFilter} />
      <div
        className={`${
          isFilter ? "max-h-[400px]" : "max-h-0"
        } lg:block transition-all duration-500 ease-in-out lg:max-h-full overflow-hidden`}
      >
        <ByDate />
        <ByRate />
        <ByPopularity />
        <ByName />
        <RateRange />
        <ByCategories />
      </div>
    </section>
  );
};

export default Filter;
