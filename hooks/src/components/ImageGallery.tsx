import React, { useState } from "react";
import useImageSearch from "../hooks/useImageSearch";
import usePagination from "../hooks/usePagination";

const ImageGallery: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const { currentPage, goToNextPage, goToPrevPage } = usePagination();
  const { images, isLoading, error } = useImageSearch(keyword, currentPage);

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
        <p>현재 페이지 : {currentPage}</p>
        <button onClick={goToPrevPage} disabled={currentPage <= 1}>
          이전 페이지
        </button>
        <button onClick={goToNextPage}>다음 페이지</button>
      </section>
      <section>
        {isLoading && <p>이미지를 로딩 중입니다...</p>}
        {error && <p>에러가 발생했습니다: {error.message}</p>}
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
