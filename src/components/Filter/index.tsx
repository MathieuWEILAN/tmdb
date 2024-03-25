import ByDate from "./ByDate";
import ByRate from "./ByRate";
import ByPopularity from "./ByPopularity";
import ByName from "./ByName";
const Filter: React.FC = () => {
  return (
    <section className="h-full bg-red-200 w-72 p-5">
      <h2 className="text-center">Filter</h2>
      <ByDate />
      <ByRate />
      <ByPopularity />
      <ByName />
    </section>
  );
};

export default Filter;
