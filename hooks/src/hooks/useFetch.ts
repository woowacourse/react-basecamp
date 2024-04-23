import { useEffect, useState } from "react"

const useFetch = <T>(keyword: string, page: number) => {
  const [data, setData] = useState<T>();
  
  const searchParams = new URLSearchParams({
    key: import.meta.env.VITE_PIXABAY_API_KEY,
    q: keyword ?? '',
    page: `${page}`,
  });  

  const uri = `https://pixabay.com/api/?${searchParams}`;  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(uri);        
        const responseData = await response.json();        
        setData(responseData)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [uri]);

  return {
    data,
  }
}

export default useFetch;

