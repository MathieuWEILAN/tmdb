import { createContext, useState, useContext } from "react";
import { Movie, Genre, TVShow } from "@/models/types";

export const FilterContext = createContext<FilterContextType>(
  {} as FilterContextType
);

type FilterContextType = {
  sortByDate?: SortOrder;
  setSortByDate?: React.Dispatch<React.SetStateAction<SortOrder>>;
  arrayToDisplay?: Movie[] | TVShow[];
  setArrayToDisplay?: React.Dispatch<React.SetStateAction<Movie[] | TVShow[]>>;
  sortByRate?: SortOrder;
  setSortByRate?: React.Dispatch<React.SetStateAction<SortOrder>>;
  sortByPopularity?: SortOrder;
  setSortByPopularity?: React.Dispatch<React.SetStateAction<SortOrder>>;
  sortByName?: SortOrder;
  setSortByName?: React.Dispatch<React.SetStateAction<SortOrder>>;
  filteredRate: React.Dispatch<React.SetStateAction<number[]>>;
  categoriesArray?: Genre[];
  sortByCategories: any;
  filters: Filters;
  filterByYears: any;
};

type FilterProviderProps = {
  children: React.ReactNode;
  value: Movie[] | TVShow[];
  categories: Genre[];
};

type Filters = {
  name: string[] | null;
  sort: {
    sort_date: SortOrder | null;
    sort_rate: SortOrder | null;
    sort_popularity: SortOrder | null;
    sort_name: SortOrder | null;
  };
  rate: number[];
  categories: Genre[];
  years: { start: number; end: number } | null;
};

enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export const FilterProvider: React.FC<FilterProviderProps> = ({
  children,
  value = [],
  categories = [],
}) => {
  let arrayToDisplay = value;
  let categoriesArray = categories;
  const [filters, setFilters] = useState<Filters>({
    sort: {
      sort_date: null,
      sort_rate: null,
      sort_popularity: null,
      sort_name: null,
    },
    name: null,
    rate: [0, 10],
    categories: [],
    years: { start: 1900, end: new Date().getFullYear() },
  });

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

  const filteredRate = (rate: number[]) => {
    setFilters({ ...filters, rate });
  };

  const sortByCategories = (cat: Genre) => {
    if (filters.categories.length === 0) {
      setFilters({ ...filters, categories: [...filters.categories, cat] });
    } else {
      const find = filters.categories.find((c) => c.id === cat.id);
      if (find) {
        setFilters({
          ...filters,
          categories: filters.categories.filter((c) => c.id !== cat.id),
        });
      } else {
        setFilters({ ...filters, categories: [...filters.categories, cat] });
      }
    }
  };

  const filterByYears = (years: { start: number; end: number }) => {
    setFilters({ ...filters, years });
  };

  const filterContent = (value: Movie[], filters: Filters) => {
    if (filters.sort.sort_date) {
      arrayToDisplay = value.sort((a, b) => {
        if (a.release_date) {
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
        } else {
          if (filters.sort.sort_date === SortOrder.ASC) {
            let dateA = new Date(a.first_air_date);
            let dateB = new Date(b.first_air_date);
            return dateA - dateB;
          }
          if (filters.sort.sort_date === SortOrder.DESC) {
            let dateA = new Date(a.first_air_date);
            let dateB = new Date(b.first_air_date);
            return dateB - dateA;
          }
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
        if (a?.title) {
          if (filters.sort.sort_name === SortOrder.ASC)
            return a?.title.localeCompare(b.title);
          if (filters.sort.sort_name === SortOrder.DESC)
            return b.title.localeCompare(a.title);
        } else {
          if (filters.sort.sort_name === SortOrder.ASC)
            return a?.name.localeCompare(b.name);
          if (filters.sort.sort_name === SortOrder.DESC)
            return b.name.localeCompare(a.name);
        }
      });
    }

    if (filters.rate) {
      arrayToDisplay = arrayToDisplay.filter((movie) => {
        if (
          movie.vote_average >= filters.rate[0] &&
          movie.vote_average <= filters.rate[1]
        ) {
          return movie;
        }
      });
    }

    if (filters.categories.length > 0) {
      arrayToDisplay = arrayToDisplay.filter((movie) => {
        let hasCat = false;
        for (let index = 0; index < filters.categories.length; index++) {
          const element = filters.categories[index];
          if (movie.genre_ids.includes(element.id)) {
            hasCat = true;
          } else {
            hasCat = false;
            break;
          }
        }
        return hasCat;
      });
    }

    if (filters.years) {
      console.log(arrayToDisplay[0]);
      arrayToDisplay = arrayToDisplay.filter((movie) => {
        let releaseYear = movie.release_date
          ? Number(movie.release_date.split("-")[0])
          : Number(movie?.first_air_date.split("-")[0]);
        if (
          releaseYear >= filters.years.start &&
          releaseYear <= filters.years.end
        ) {
          return movie;
        }
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
  return (
    <FilterContext.Provider
      value={{
        arrayToDisplay,
        categoriesArray,
        sortByDate,
        sortByRate,
        sortByPopularity,
        sortByName,
        filteredRate,
        sortByCategories,
        filterByYears,
        filters,
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

export const useCategories = () => {
  const { categoriesArray } = useContext(FilterContext);
  return categoriesArray ? categoriesArray : null;
};
