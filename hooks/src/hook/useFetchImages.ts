import { useState, useEffect } from "react";

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const useFetchImages = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!keyword.trim()) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        keyword
      )}&image_type=photo`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const fetchedImages = data.hits.map((hit: any) => ({
          id: hit.id,
          webformatURL: hit.webformatURL,
          tags: hit.tags,
        }));
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to fetch images");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [keyword]);

  return { images, isLoading, error };
};

export default useFetchImages;
