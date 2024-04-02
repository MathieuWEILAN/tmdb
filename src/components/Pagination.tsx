import ReactPaginate from "react-paginate";
import { MovieListing } from "@/models/types";
import { useEffect, useState } from "react";

const Pagination = ({
  infos,
  query,
  setResults,
  url,
}: {
  infos: MovieListing;
  query?: string;
  setResults?: (results: MovieListing) => void;
  url: string;
}) => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    setPageNumber(infos.page);
    setPageCount(infos.total_pages);
  }, [infos.total_pages, pageNumber]);

  const fetchData = async (number: number) => {
    const response = await fetch(`/api/tmdbapi?name=${url}&page=${number}`);
    const newResponse = await response.json();
    setResults(newResponse);
    return newResponse;
  };

  const handlePageClick = (data: { selected: number }) => {
    if (pageNumber === pageCount) return;
    setPageNumber(data.selected + 1);
    fetchData(data.selected + 1);
  };
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeLinkClassName={`bg-stone-950 text-white rounded-full w-full h-full flex items-center justify-center w-8 h-8`}
        className={`flex items-center w-full justify-center my-10 mx-5`}
        pageClassName={`mx-1 rounded-full flex items-center justify-center w-8 h-8`}
      />
    </>
  );
};

export default Pagination;
