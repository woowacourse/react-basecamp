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
      {/* ... */}
      <section>
        <div>
          <span>Page: {currentPage}</span>
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button onClick={goToNextPage}>Next Page</button>
        </div>
        {/* ... */}
      </section>
      <section>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!isLoading && !error && (
          <>
            {images.length === 0 && <p>No images found.</p>}
            {images.map((image) => (
              <article key={image.id}>
                <img src={image.webformatURL} alt={image.tags} />
                <p>{image.tags}</p>
              </article>
            ))}
          </>
        )}
      </section>
      {/* ... */}
    </>
  );
};

export default ImageGallery;
