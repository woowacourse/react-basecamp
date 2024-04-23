import { useEffect, useState } from "react";

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface Data {
  total: number;
  totalHits: number;
  hits: Image[];
}

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (fetchUrl: string) => {
    if (!fetchUrl) return;

    setIsLoading(true);
    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();

      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(new Error(`Error fetching data:${error}`));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return { data, error, isLoading };
};

export default useFetch;
