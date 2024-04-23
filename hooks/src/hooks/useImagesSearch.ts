import { useState, useEffect } from 'react';
import useFetch from './useFetch';

export const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

export interface ImageSearchResult {
  hits: Image[];
}

const useImageSearch = (keyword: string, page: number) => {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    keyword
  )}&page=${page}&image_type=photo&pretty=true`;
  const [images, setImages] = useState<Image[]>([]);
  const { data, isLoading, error } = useFetch<ImageSearchResult>(url);

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [data]);

  return { images, isLoading, error };
};

export default useImageSearch;
