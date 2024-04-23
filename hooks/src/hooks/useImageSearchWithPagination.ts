// useImageSearchWithPagination.ts
import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import usePagination from "./usePagination";
import useImageSearch from "./useImageSearch";

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
  const { currentPage, goToNextPage, goToPrevPage } = usePagination();
  const { images, isLoading, error } = useImageSearch(keyword, currentPage);

  // 여기에 useFetch를 사용하여 이미지 데이터를 가져오는 로직을 작성하세요.
  // 힌트:
  // 1. useFetch 훅을 사용하여 이미지 데이터를 가져오세요.
  // 2. 가져온 이미지 데이터를 images 상태에 저장하세요.
  // 3. keyword와 currentPage가 변경될 때마다 이미지 데이터를 다시 가져오도록 종속성 배열을 설정하세요.

  return { images, currentPage, goToNextPage, goToPrevPage, isLoading, error };
};

export default useImageSearchWithPagination;
