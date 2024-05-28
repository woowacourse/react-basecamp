import { useEffect, useState } from "react";

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
  const { currentPage, goToPrevPage, goToNextPage } = usePagination();
  const { data, isLoading, error } = useFetch<ImageSearchResult>(
    `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
      keyword
    )}&image_type=photo&pretty=true&page=${currentPage}`
  );

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [data]);

  return { images, currentPage, goToPrevPage, goToNextPage, isLoading, error };
};

export default useImageSearchWithPagination;
