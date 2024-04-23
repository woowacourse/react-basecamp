import { useState, useEffect } from "react";
import useImage from "../hooks/useImage";
import useImageSearchWithPagination from "../hooks/useImageSearchWithPagination";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const DEFAULT_API_URL = "https://pixabay.com/api/?key=";

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

const ImageGallery: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const {
    images,
    currentPage,
    handleNextPage,
    handlePreviousPage,
    isLoading,
    error,
  } = useImageSearchWithPagination(keyword);

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
        <div>
          <span>Page: {currentPage}</span>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button onClick={handleNextPage}>Next Page</button>
        </div>
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
        {error && <p>Error: {error.message}</p>}
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
