import { useEffect, useState } from "react";
import useFetch from "./useFetch";

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface ImageSearchResult {
  hits: Image[];
}

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const DEFAULT_API_URL = "https://pixabay.com/api/?key=";

const useImage = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const { data, isLoading, error } = useFetch<ImageSearchResult>(
    `${DEFAULT_API_URL}${API_KEY}&q=${encodeURIComponent(
      keyword
    )}&image_type=photo&pretty=true`
  );

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [data]);

  return {
    images,
    isLoading,
    error,
  };
};

export default useImage;
