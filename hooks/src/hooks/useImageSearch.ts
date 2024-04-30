import { useEffect, useMemo, useState } from "react";
import useFetch from "./useFetch";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo`;

const useImageSearch = (keyword: string, page: number) => {
  const [images, setImages] = useState<Image[]>([]);
  const url = useMemo(
    () => (keyword ? `${BASE_URL}&q=${keyword}&page=${page}&pretty=true` : ""),
    [keyword, page]
  );

  const { data, error, isLoading } = useFetch(url);

  useEffect(() => {
    if (!data) return;
    setImages(data.hits);
  }, [data]);

  return { images, isLoading, error };
};

export default useImageSearch;
