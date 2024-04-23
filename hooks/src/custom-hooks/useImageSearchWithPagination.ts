import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import usePagination from "./usePagination";

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface ImageSearchResult {
  hits: Image[];
}

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const useImageSearchWithPagination = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);

  const { currentPage, goToNextPage, goToPrevPage } = usePagination();

  const searchUrl = `https://pixabay.com/api/?key=${API_KEY}&q=${keyword}&page=${currentPage}&image_type=photo`;

  const { data, isLoading, error } = useFetch<ImageSearchResult>(searchUrl);

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [data]);

  return { images, currentPage, goToNextPage, goToPrevPage, isLoading, error };
};

export default useImageSearchWithPagination;
