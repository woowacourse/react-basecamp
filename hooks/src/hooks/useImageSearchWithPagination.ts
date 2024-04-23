import { useEffect, useState } from "react";
import usePagination from "./usePagination";
import useFetch from "./useFetch";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface ImageSearchResult {
  hits: Image[];
}

const useImageSearchWithPagination = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const { currentPage, goToNextPage, goToPrevPage } = usePagination();

  // 여기에 useFetch를 사용하여 이미지 데이터를 가져오는 로직을 작성하세요.
  // 힌트:
  // 1. useFetch 훅을 사용하여 이미지 데이터를 가져오세요.
  // 2. 가져온 이미지 데이터를 images 상태에 저장하세요.
  // 3. keyword와 currentPage가 변경될 때마다 이미지 데이터를 다시 가져오도록 종속성 배열을 설정하세요.

  const { data, isLoading, error } = useFetch<ImageSearchResult>(
    `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
      keyword
    )}&page=${currentPage}&image_type=photo&pretty=true`
  );

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [data]);

  return { images, currentPage, goToNextPage, goToPrevPage, isLoading, error };
};

export default useImageSearchWithPagination;
