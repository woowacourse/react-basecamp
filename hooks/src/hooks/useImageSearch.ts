import { useEffect, useState } from 'react';
import useFetch from './useFecth';

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface ImageSearchResult {
  hits: Image[];
}

const useImageSearch = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const { data, isLoading, error } = useFetch<ImageSearchResult>(
    `https://pixabay.com/api?key=${API_KEY}&$q=${encodeURIComponent(keyword)}&image_type=photo&pretty=true`,
  );

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [data]);

  return { images, isLoading, error };
};

export default useImageSearch;
