import React, { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [keyword, setKeyword] = useState("");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(e.currentTarget.keyword.value);
  };

  return (
    <>
      <header>
        <h1>Image Gallery</h1>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="searchKeyword">검색:</label>
          <input
            type="text"
            id="searchKeyword"
            name="keyword"
            placeholder="키워드 입력"
          />
          <button type="submit">Search</button>
        </form>
      </section>
      <section>
        {images.map((image) => (
          <article key={image.id}>
            <img src={image.webformatURL} alt={image.tags} />
            <p>{image.tags}</p>
          </article>
        ))}
      </section>
    </>
  );
};

export default ImageGallery;
