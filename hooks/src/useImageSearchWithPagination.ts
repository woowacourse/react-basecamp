import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import usePagination from './usePagination';

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface ImageFetchResult {
  hits: Image[];
}

const useImageSearchWithPagination = (keyword: string) => {
  const { currentPage, goToNextPage, goToPrevPage } = usePagination();
  const [images, setImages] = useState<Image[]>([]);

  const { data, isLoading, error } = useFetch<ImageFetchResult>(
    `https://pixabay.com/api/?key=${API_KEY}&q=${keyword}&page=${currentPage}&image_type=photo&pretty=true`
  );

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [keyword, currentPage, data]);

  return { images, isLoading, error, currentPage, goToNextPage, goToPrevPage };
};

export default useImageSearchWithPagination;
