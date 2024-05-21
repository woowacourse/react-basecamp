import { useState, useEffect } from 'react';
import useFetch from './useFetch';

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface ImageSearchProps {
  keyword: string;
  currentPage: number;
}

interface ImageFetchResult {
  hits: Image[];
}

const useImageSearch = ({ keyword, currentPage }: ImageSearchProps) => {
  const [images, setImages] = useState<Image[]>([]);
  const { data, isLoading, error } = useFetch<ImageFetchResult>(
    `https://pixabay.com/api/?key=${API_KEY}&q=${keyword}&page=${currentPage}&image_type=photo&pretty=true`
  );

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [data, keyword, currentPage]);

  return { images, isLoading, error };
};

export default useImageSearch;
