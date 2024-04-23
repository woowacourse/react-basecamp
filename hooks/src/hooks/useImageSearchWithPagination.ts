import { useEffect, useState } from 'react';
import { API_KEY, Image, ImageSearchResult } from './useImagesSearch';
import usePagination from './usePagination';
import useFetch from './useFetch';

const useImageSearchWithPagination = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const { currentPage, goToNextPage, goToPrevPage } = usePagination();

  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    keyword
  )}&page=${currentPage}&image_type=photo&pretty=true`;

  const { data, isLoading, error } = useFetch<ImageSearchResult>(url);

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [data]);

  return { images, currentPage, goToNextPage, goToPrevPage, isLoading, error };
};

export default useImageSearchWithPagination;
