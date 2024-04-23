import React, { useState } from 'react';

import useImage from '../hooks/useImage';

const ImageGallery: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const images = useImage(keyword);
  // useEffect를 사용하여 keyword가 변경될 때마다 이미지를 가져오는 로직을 작성해보세요.

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
          <label htmlFor='searchKeyword'>검색:</label>
          <input
            type='text'
            id='searchKeyword'
            name='keyword'
            placeholder='키워드 입력'
          />
          <button type='submit'>Search</button>
        </form>
      </section>
      <section>
        {images.map(image => (
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
