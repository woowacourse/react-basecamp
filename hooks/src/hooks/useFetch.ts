/**
 * 주어진 URL을 사용하여 데이터를 가져옵니다.
 * 가져온 데이터를 상태로 관리합니다.
 * 로딩 상태와 에러 상태를 관리합니다.
 */

import { useState, useEffect } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error as Error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
