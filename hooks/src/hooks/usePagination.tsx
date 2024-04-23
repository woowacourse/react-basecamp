import { useState } from "react";

const usePagination = (initialPage: number) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.max(prev + 1, 1));
  };

  return { currentPage, goToPrevPage, goToNextPage };
};

export default usePagination;
