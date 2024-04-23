import { useState } from "react";

const usePagination = (initialPage: number = 1) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage === initialPage) return;

    setCurrentPage((prevPage) => prevPage - 1);
  };

  return {
    currentPage,
    goToNextPage,
    goToPrevPage,
  };
};

export default usePagination;
