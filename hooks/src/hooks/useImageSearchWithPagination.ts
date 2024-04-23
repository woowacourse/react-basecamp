// useImageSearchWithPagination.ts
import UsePagination from "./usePagination";
import UseImageSearch from "./useImageSearch";

const UseImageSearchWithPagination = (keyword: string) => {
  const { currentPage, goToNextPage, goToPrevPage } = UsePagination(keyword);
  const { images, isLoading, error } = UseImageSearch(keyword, currentPage);

  return { images, currentPage, goToNextPage, goToPrevPage, isLoading, error };
};

export default UseImageSearchWithPagination;
