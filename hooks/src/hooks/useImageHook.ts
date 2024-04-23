import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface ResponseData {
  total: number;
  totalHits: number;
  hits: Image[];
}

const useImageHook = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const { data, isLoading, error } = useFetch<ResponseData>(`https://pixabay.com/api/?key=${API_KEY}&q=${keyword}`);

  useEffect(() => {
    if (!isLoading && !error && data) setImages(data.hits);
  }, [data, isLoading, error]);

  return { images };
};

export default useImageHook;
