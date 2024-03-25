import { createContext, useState, useContext } from "react";
import { Movie } from "@/models/types";

export const FilterContext = createContext<FilterContextType>(
  {} as FilterContextType
);

type FilterContextType = {
  sortByDate?: SortOrder;
  setSortByDate?: React.Dispatch<React.SetStateAction<SortOrder>>;
  arrayToDisplay?: Movie[];
  setArrayToDisplay?: React.Dispatch<React.SetStateAction<Movie[]>>;
  sortByRate?: SortOrder;
  setSortByRate?: React.Dispatch<React.SetStateAction<SortOrder>>;
  sortByPopularity?: SortOrder;
  setSortByPopularity?: React.Dispatch<React.SetStateAction<SortOrder>>;
  sortByName?: SortOrder;
  setSortByName?: React.Dispatch<React.SetStateAction<SortOrder>>;
};

type FilterProviderProps = {
  children: React.ReactNode;
  value: Movie[];
};

type Filters = {
  name: string[] | null;
  sort: {
    sort_date: SortOrder | null;
    sort_rate: SortOrder | null;
    sort_popularity: SortOrder | null;
    sort_name: SortOrder | null;
  };
  rate: {
    start: number | null;
    finish: number | null;
  } | null;
};

enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export const FilterProvider: React.FC<FilterProviderProps> = ({
  children,
  value = [],
}) => {
  /*   const [arrayToDisplay, setArrayToDisplay] = useState<Movie[]>(value); */
  const [filters, setFilters] = useState<Filters>({
    sort: {
      sort_date: null,
      sort_rate: null,
      sort_popularity: null,
      sort_name: null,
    },
    name: null,
    rate: null,
  });
  let arrayToDisplay = value;

  const sortByDate = (order: SortOrder | null) => {
    const newSort = {
      sort_date: order,
      sort_rate: null,
      sort_popularity: null,
      sort_name: null,
    };
    setFilters({ ...filters, sort: newSort });
  };

  const sortByRate = (order: SortOrder | null) => {
    const newSort = {
      sort_date: null,
      sort_rate: order,
      sort_popularity: null,
      sort_name: null,
    };
    setFilters({ ...filters, sort: newSort });
  };

  const sortByPopularity = (order: SortOrder | null) => {
    const newSort = {
      sort_date: null,
      sort_rate: null,
      sort_popularity: order,
      sort_name: null,
    };
    setFilters({ ...filters, sort: newSort });
  };

  const sortByName = (order: SortOrder | null) => {
    const newSort = {
      sort_date: null,
      sort_rate: null,
      sort_popularity: null,
      sort_name: order,
    };
    setFilters({ ...filters, sort: newSort });
  };

  const filterContent = (value: Movie[], filters: Filters) => {
    if (filters.sort.sort_date) {
      arrayToDisplay = value.sort((a, b) => {
        if (filters.sort.sort_date === SortOrder.ASC) {
          let dateA = new Date(a.release_date);
          let dateB = new Date(b.release_date);
          return dateA - dateB;
        }
        if (filters.sort.sort_date === SortOrder.DESC) {
          let dateA = new Date(a.release_date);
          let dateB = new Date(b.release_date);
          return dateB - dateA;
        }
      });
    }

    if (filters.sort.sort_rate) {
      arrayToDisplay = value.sort((a, b) => {
        if (filters.sort.sort_rate === SortOrder.ASC)
          return a.vote_average - b.vote_average;
        if (filters.sort.sort_rate === SortOrder.DESC)
          return b.vote_average - a.vote_average;
      });
    }

    if (filters.sort.sort_popularity) {
      arrayToDisplay = value.sort((a, b) => {
        if (filters.sort.sort_popularity === SortOrder.ASC)
          return a.vote_average - b.vote_average;
        if (filters.sort.sort_popularity === SortOrder.DESC)
          return b.vote_average - a.vote_average;
      });
    }

    if (filters.sort.sort_name) {
      arrayToDisplay = value.sort((a, b) => {
        if (filters.sort.sort_name === SortOrder.ASC)
          return a.title.localeCompare(b.title);
        if (filters.sort.sort_name === SortOrder.DESC)
          return b.title.localeCompare(a.title);
      });
    }

    return arrayToDisplay;
  };

  const removeDuplicates = (array: Movie[]) => {
    const unique = new Map(array.map((item) => [item.id, item]));
    return Array.from(unique.values());
  };

  arrayToDisplay = filterContent(value, filters);
  arrayToDisplay = removeDuplicates(arrayToDisplay);
  /*  
  contenu de filterContent:

  if (filters.sort_date) {
    arrayToDisplay = value.sort((a, b) => {
      if (filters.sort_date === SortOrder.ASC) return a.release_date - b.release_date;
      if (filters.sort_date === SortOrder.DESC) return b.release_date - a.release_date;
    })
  } 

  // puis tous les autres if

*/

  return (
    <FilterContext.Provider
      value={{
        arrayToDisplay,
        sortByDate,
        sortByRate,
        sortByPopularity,
        sortByName,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFirstMovie = () => {
  const { arrayToDisplay } = useContext(FilterContext);
  return arrayToDisplay ? arrayToDisplay[0] : null;
};

export const useContents = () => {
  const { arrayToDisplay } = useContext(FilterContext);
  return arrayToDisplay ? arrayToDisplay : null;
};
