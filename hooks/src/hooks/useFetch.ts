// 힌트 버전
import { useState, useEffect } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const json: T = await response.json();
      setData(json);
    } catch (error) {
      const err = error as Error;
      console.error("Failed to fetch images:", err);
      setError(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchImage(url);
    setIsLoading(false);
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;

// 여기에 데이터 fetching 로직을 작성하세요.
// 힌트:
// 1. isLoading 상태를 true로 설정하세요.
// 2. try-catch 블록을 사용하여 데이터를 가져오세요.
// 3. 가져온 데이터를 data 상태에 저장하세요.
// 4. isLoading 상태를 false로 설정하세요.
// 5. 에러가 발생한 경우 error 상태에 에러를 저장하세요.
