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
    if (keyword) {
      fetchImages().then((data) => {
        setImages(data.hits);
      });
    }
  }, [keyword]);

  const fetchImages = async () => {
    const requestURL =
      'https://pixabay.com/api/?key=' + API_KEY + '&q=' + encodeURIComponent(keyword);

    const response = await fetch(requestURL);

    return response.json();
  };

  return { images };
};

export default useImageSearch;
