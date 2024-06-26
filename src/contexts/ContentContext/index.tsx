import { createContext, useState, useContext } from "react";
import { Movie, Genre } from "@/models/types";

export const ContentContext = createContext<ContentContextType>(
  {} as ContentContextType
);

type ContentContextType = {
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
  filteredRate: React.Dispatch<React.SetStateAction<number[]>>;
  categoriesArray?: Genre[];
  sortByCategories: any;
  filters: Contents;
};

type ContentProviderProps = {
  children: React.ReactNode;
  value: Movie[];
  categories: Genre[];
};

type Contents = {
  name: string[] | null;
  sort: {
    sort_date: SortOrder | null;
    sort_rate: SortOrder | null;
    sort_popularity: SortOrder | null;
    sort_name: SortOrder | null;
  };
  rate: number[];
  categories: Genre[];
};

enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
  value = [],
  categories = [],
}) => {
  let arrayToDisplay = value;
  let categoriesArray = categories;
  const [filters, setFilters] = useState<Contents>({
    sort: {
      sort_date: null,
      sort_rate: null,
      sort_popularity: null,
      sort_name: null,
    },
    name: null,
    rate: [0, 10],
    categories: [],
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

  const filterContent = (value: Movie[], filters: Contents) => {
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

    return arrayToDisplay;
  };

  const removeDuplicates = (array: Movie[]) => {
    const unique = new Map(array.map((item) => [item.id, item]));
    return Array.from(unique.values());
  };

  arrayToDisplay = filterContent(value, filters);
  arrayToDisplay = removeDuplicates(arrayToDisplay);
  return (
    <ContentContext.Provider
      value={{
        arrayToDisplay,
        categoriesArray,
        sortByDate,
        sortByRate,
        sortByPopularity,
        sortByName,
        filteredRate,
        sortByCategories,
        filters,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useFirstMovie = () => {
  const { arrayToDisplay } = useContext(ContentContext);
  return arrayToDisplay ? arrayToDisplay[0] : null;
};

export const useContents = () => {
  const { arrayToDisplay } = useContext(ContentContext);
  return arrayToDisplay ? arrayToDisplay : null;
};

export const useCategories = () => {
  const { categoriesArray } = useContext(ContentContext);
  return categoriesArray ? categoriesArray : null;
};
