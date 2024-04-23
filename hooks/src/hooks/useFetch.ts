import { useEffect, useState } from "react";

const useFetch = <T>(url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setIsLoading(true);
    const fetchWrapper = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error as Error);
      }
    };
    fetchWrapper();
  }, [url]);

  return { isLoading, data, error };
};

export default useFetch;
