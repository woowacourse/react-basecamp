import usePagination from "./usePagination";
import useImage from "./useImage";

const useImageSearchWithPagination = (keyword: string) => {
  const { images, isLoading, error } = useImage(keyword);
  const { currentPage, handleNextPage, handlePreviousPage } = usePagination();

  return {
    images,
    currentPage,
    handleNextPage,
    handlePreviousPage,
    isLoading,
    error,
  };
};

export default useImageSearchWithPagination;
