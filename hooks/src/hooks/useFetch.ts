import { useState, useEffect } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetching = async () => {
      setIsLoading(true);
      try {
        const data = await fetch(url);
        const result = await data.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        setError(error as Error);
      }
    };
    fetching();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
