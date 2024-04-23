import { useState } from 'react';

const usePagination = (initialPage: number = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
  };

  return { currentPage, goToNextPage, goToPrevPage };
};

export default usePagination;
