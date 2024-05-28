import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface Json {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}
interface PixabayImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}
export default function useImage(keyword: string) {
  const [images, setImages] = useState<Image[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&q=${keyword}`
        );
        const json = (await response.json()) as Json;

        const data = json.hits.map(hit => ({
          id: hit.id,
          webformatURL: hit.webformatURL,
          tags: hit.tags,
        }));

        setImages(await data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [keyword]);

  return images;
}
