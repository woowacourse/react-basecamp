import { useState, useEffect } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 여기에 데이터 fetching 로직을 작성하세요.
    // 힌트:
    // 1. isLoading 상태를 true로 설정하세요.
    // 2. try-catch 블록을 사용하여 데이터를 가져오세요.
    // 3. 가져온 데이터를 data 상태에 저장하세요.
    // 4. isLoading 상태를 false로 설정하세요.
    // 5. 에러가 발생한 경우 error 상태에 에러를 저장하세요.
    const fetching = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error as Error);
      }
      setIsLoading(false);
    };

    fetching();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
