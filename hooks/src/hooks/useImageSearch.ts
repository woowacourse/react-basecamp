import { useState, useEffect } from 'react';

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
          `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
            keyword,
          )}&image_type=photo&pretty=true`,
        );
        const data = await response.json();
        setImages(data.hits);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    if (keyword) {
      fetchImages();
    }
  }, [keyword]);

  return { images };
};

export default useImageSearch;
