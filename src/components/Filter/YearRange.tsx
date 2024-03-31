import { ChangeEvent, useContext } from "react";
import { FilterContext } from "@/contexts/FilterContext";
import { start } from "repl";

const YearRange = () => {
  const { filterByYears, filters } = useContext(FilterContext);

  const handleStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startValue = parseInt(e.target.value, 10) || 1900;
    const endValue = filters.years?.end || null; // Ajustez '0' selon votre besoin
    filterByYears({ start: startValue, end: endValue });
  };

  const handleEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentYear = new Date().getFullYear();
    const endValue = parseInt(e.target.value, 10) || currentYear; // Utilisez '0' ou une autre valeur par défaut si nécessaire
    const startValue = filters.years?.start || null; // Ajustez '0' selon votre besoin
    filterByYears({ start: startValue, end: endValue });
  };

  return (
    <div className="w-full">
      <span>By Year</span>
      <div className="flex w-full justify-between space-x-4">
        <input
          value={filters?.years?.start}
          type="number"
          onChange={(e) => {
            handleStart(e);
          }}
          className="bg-white box-shadow-2 px-2 py-1 text-center w-1/2 rounded-full"
          max={new Date().getFullYear()}
          min={1900}
        />
        <input
          value={filters?.years?.end}
          type="number"
          onChange={(e) => {
            handleEnd(e);
          }}
          className="bg-white box-shadow-2 px-2 py-1 text-center w-1/2 rounded-full"
          max={new Date().getFullYear()}
          min={1900}
        />
      </div>
    </div>
  );
};

export default YearRange;
