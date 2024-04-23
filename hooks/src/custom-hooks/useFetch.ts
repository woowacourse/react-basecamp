import { useEffect, useState } from "react";

interface ErrorState {
  isError: boolean;
  errorText: string;
}

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<ErrorState>({
    isError: false,
    errorText: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const fetchedData = await response.json();

        setData(fetchedData);
        setIsLoading(false);
        setError({
          isError: false,
          errorText: "",
        });
      } catch (error) {
        if (error instanceof Error) {
          setError({
            isError: true,
            errorText: error.message,
          });
        }
      }
    };

    if (!url) return;

    fetchData();
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
