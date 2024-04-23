import { useState, useEffect } from 'react';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData(url: string) {
      try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
      } catch (error) {
        console.error(error);
      }
    }

    let ignore = false;

    try {
      setIsLoading(true);

      fetchData(url).then((data: T) => {
        if (!ignore) setData(data);
      });

      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
