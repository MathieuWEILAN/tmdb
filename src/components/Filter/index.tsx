import ByDate from "./ByDate";
import ByRate from "./ByRate";
import ByPopularity from "./ByPopularity";
import ByName from "./ByName";
import RateRange from "./RateRange";
import ByCategories from "./ByCategories";

const Filter: React.FC = () => {
  return (
    <section className="h-auto rounded-xl shadow-xl w-72 p-5 space-y-2.5">
      <h2 className="text-center">Filter</h2>
      <ByDate />
      <ByRate />
      <ByPopularity />
      <ByName />
      <RateRange />
      <ByCategories />
    </section>
  );
};

export default Filter;
