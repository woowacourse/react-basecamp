import { useState } from "react";
import { PixabayResponse } from "../type";
import useFetch from "./useFetch";

interface PaginationProps {
  keyword: string;
}

const usePagination = ({keyword}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data } = useFetch<PixabayResponse>(keyword, currentPage);  

  const goNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  }

  const goPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  return {
    currentPage,
    goNextPage,
    goPreviousPage,
    currentData: data,
  }
}

export default usePagination;