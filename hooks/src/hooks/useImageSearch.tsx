import { useEffect, useState } from "react";
import { Image, ResponseType } from "../components/ImageGallery";
import useFetch from "./useFetch";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const useImageSearch = (keyword: string, page: number) => {
  const [images, setImages] = useState<Image[]>([]);
  const { data, isLoading, error } = useFetch<ResponseType>(
    `https://pixabay.com/api/?key=${API_KEY}&q=${keyword}&page=${page}&image_type=photo&pretty=true`
  );

  useEffect(() => {
    if (data) {
      setImages(data.hits);
      console.log(images);
    }
  }, [data]);

  return { images, isLoading, error };
};

export default useImageSearch;
