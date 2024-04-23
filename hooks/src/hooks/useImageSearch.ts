import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

const useImageSearch = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(keyword)}&image_type=photo`
        );
        const data = await response.json();
        setImages(data.hits);
      } catch (error) {
        console.error("데이터 수신 에러: ", error);
      }
    };

    if (keyword) fetchImages();
  }, [keyword]);

  return { images };
};

export default useImageSearch;
