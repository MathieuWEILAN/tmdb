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
  const [pageCount, setPageCount] = useState<number>(
    infos.total_pages ? infos.total_pages : 0
  );
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    setPageNumber(infos.total_pages);
  }, [infos.total_pages, pageNumber]);

  const fetchData = async (number: number) => {
    const response = await fetch(`/api/tmdbapi?name=${url}&page=${number}`);
    const newResponse = await response.json();
    setResults(newResponse);
    return newResponse;
  };

  const handlePageClick = (data: { selected: number }) => {
    setPageNumber(data.selected + 1);
    fetchData(data.selected + 1);
  };
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="flex items-center w-full justify-center my-10 [&_li]:mx-2 [&_li]:border-2 [&_li]:border-stone-950 [&_li]:p-2"
      />
    </>
  );
};

export default Pagination;
