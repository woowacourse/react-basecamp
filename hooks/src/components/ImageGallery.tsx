import React, { useState } from "react";
import usePagination from "../hooks/usePagination";


const ImageGallery: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const {currentData, currentPage, goNextPage, goPreviousPage} = usePagination({keyword});

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
        {currentData !== undefined && (
          currentData.hits.map((image) => (
            <article key={image.id}>
              <img src={image.webformatURL} alt={image.tags} />
              <p>{image.tags}</p>
            </article>
          ))
        )}
      </section>
      <div style={{display: 'flex'}}>
        <button onClick={goPreviousPage}>previous</button>
        {currentPage}
        <button onClick={goNextPage}>next</button>
      </div>
    </>
  );
};

export default ImageGallery;
