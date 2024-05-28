import React, { useState } from "react";
import useFetchImage from "../hook/useFetchImages";

const ImageGallery: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const { images, isLoading, error } = useFetchImage(keyword);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newKeyword = e.currentTarget.elements.namedItem(
      "keyword"
    ) as HTMLInputElement;
    setKeyword(newKeyword.value);
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
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
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
