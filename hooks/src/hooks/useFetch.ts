import { useState, useEffect } from "react";

const UseFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const fetchData = await response.json();
        setData(fetchData);
      } catch (error) {
        setError(error as Error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default UseFetch;
