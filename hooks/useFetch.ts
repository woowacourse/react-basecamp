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
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error instanceof Error) setError(error);
      }
      setIsLoading(false);
    };
    if (url.length > 0) fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
