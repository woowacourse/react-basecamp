import { Image, ResponseImagesType } from "../components/ImageGallery";
import { useEffect, useState } from "react";
import usePagination from "./usePagination";
import useFetch from "./useFetch";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const useImageaSearchWithPagination = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const { currentPage, goToPrevPage, goToNextPage } = usePagination(1);

  const { data, isLoading, error } = useFetch<ResponseImagesType>(
    `https://pixabay.com/api/?key=${API_KEY}&q=${keyword}&page=${currentPage}&image_type=photo&pretty=true`
  );

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [data]);
  return { images, currentPage, goToNextPage, goToPrevPage, isLoading, error };
};
export default useImageaSearchWithPagination;
