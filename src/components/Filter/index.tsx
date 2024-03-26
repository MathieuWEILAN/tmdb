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
    <section className="h-auto rounded-xl shadow-2xl w-full lg:w-72 sticky top-[100px] p-4">
      <FilterIcon className="lg:hidden" onClick={handleFilter} />

      <div
        className={`${
          isFilter ? "max-h-screen p-2" : "max-h-0"
        } lg:block transition-all duration-500 ease-in-out lg:max-h-full overflow-hidden space-y-4`}
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
