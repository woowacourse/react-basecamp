import { useState, useEffect, useMemo } from "react";
import useFetch from "./useFetch";
import usePagination from "./usePagination";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface ImageSearchResult {
  hits: Image[];
}

const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo`;

const useImageSearchWithPagination = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const { currentPage, goToNextPage, goToPrevPage } = usePagination();

  const url = useMemo(
    () =>
      keyword ? `${BASE_URL}&q=${keyword}&page=${currentPage}&pretty=true` : "",
    [keyword, currentPage]
  );

  const { data, error, isLoading } = useFetch<ImageSearchResult>(url);

  useEffect(() => {
    if (!data) return;
    setImages(data.hits);
  }, [data]);

  return { images, currentPage, goToNextPage, goToPrevPage, isLoading, error };
};

export default useImageSearchWithPagination;
