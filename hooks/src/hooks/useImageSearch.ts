import { useState, useEffect } from "react";
import UseFetch from "./useFetch";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface ImageSearchResult {
  hits: Image[];
}

const UseImageSearch = (keyword: string, page: number) => {
  const [images, setImages] = useState<Image[]>([]);
  const { data, isLoading, error } = UseFetch<ImageSearchResult>(
    `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
      keyword
    )}&page=${page}&image_type=photo&pretty=true`
  );

  useEffect(() => {
    if (data) setImages(data.hits);
  }, [data]);

  return { images, isLoading, error };
};

export default UseImageSearch;
