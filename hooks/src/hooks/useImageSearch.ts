import { useEffect, useState } from "react";
import useFetch from "./useFetch";

interface FetchedImage {
  total: number;
  totalHits: number;
  hits: Image[];
}

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const useImageSearch = (keyword: string, page: number) => {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    keyword
  )}&page=${page}`;
  const [images, setImages] = useState<Image[]>([]);
  const { data, isLoading, error } = useFetch<FetchedImage>(url);
  useEffect(() => {
    if (data !== null) {
      setImages(data.hits);
    }
  }, [data]);
  return { images, isLoading, error };
};

export default useImageSearch;
