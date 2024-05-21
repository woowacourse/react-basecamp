import { useEffect, useState } from 'react';

const useFetch = <T>(fetchURL: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error as Error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [fetchURL]);

  return { data, isLoading, error };
};

export default useFetch;
