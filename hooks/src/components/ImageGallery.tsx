import React, { useState } from "react";

import useImageSearchWithPagination from "../hooks/useImageSearchPagination";

const ImageGallery: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const { images, currentPage, goToNextPage, goToPrevPage, isLoading, error } =
    useImageSearchWithPagination(keyword);

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
          <div>
            <span>Page: {currentPage}</span>
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button onClick={goToNextPage}>Next Page</button>
          </div>
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
        {error && <p>{error.message}</p>}
        {isLoading && <p>로딩중...</p>}
        {!isLoading &&
          !error &&
          images.length !== 0 &&
          images.map((image) => (
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
