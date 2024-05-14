import { useEffect, useState } from "react";

export const useFetch = <T>(fetchCallback: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCallback();
        setData(data);
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchData();
  }, [fetchCallback]);

  return { data, loading, error };
};
