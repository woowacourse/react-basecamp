import { useState, useEffect } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async (url: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error) setError(error);
      }
      setIsLoading(false);
    };

    if (url) fetchData(url);
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
