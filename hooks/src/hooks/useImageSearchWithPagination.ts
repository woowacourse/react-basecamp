import { useState, useEffect } from "react";
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

const useImageSearchWithPagination = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const { currentPage, goToNextPage, goToPrevPage } = usePagination();

  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${keyword}&page=${currentPage}&image_type=photo&pretty=true`;
  const { data, isLoading, error } = useFetch<ImageSearchResult>(url);

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [data]);

  return { images, currentPage, goToNextPage, goToPrevPage, isLoading, error };
};

export default useImageSearchWithPagination;
