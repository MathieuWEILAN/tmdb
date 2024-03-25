import { createContext, useState } from "react";
import { SortByDateType, Movie } from "@/models/types";

export const FilterContext = createContext<FilterContextType>(
  {} as FilterContextType
);

type FilterContextType = {
  sortByDate?: SortByDateType;
  setSortByDate?: React.Dispatch<React.SetStateAction<SortByDateType>>;
  arrayToDisplay?: Movie[];
  setArrayToDisplay?: React.Dispatch<React.SetStateAction<Movie[]>>;
};

type FilterProviderProps = {
  children: React.ReactNode;
};

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [sortByDate, setSortByDate] = useState<SortByDateType>(null);
  const [arrayToDisplay, setArrayToDisplay] = useState<Movie[]>([]);

  return (
    <FilterContext.Provider
      value={{ sortByDate, setSortByDate, arrayToDisplay, setArrayToDisplay }}
    >
      {children}
    </FilterContext.Provider>
  );
};
