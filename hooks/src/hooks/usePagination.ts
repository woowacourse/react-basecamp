import { useEffect, useState } from "react";

const usePagination = (keyword: string, initialPage: number = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setCurrentPage(() => 1);
  }, [keyword]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return { currentPage, goToNextPage, goToPrevPage };
};

export default usePagination;
