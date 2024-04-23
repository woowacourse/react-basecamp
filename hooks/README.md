# React Hooks

> 학습 목표: 리액트 훅을 이용하여 로직을 재사용하고, 조합하여 복잡한 문제를 간단하게 해결할 수 있다.

## 1단계 - 환경 셋팅하기

### 학습 목표

- 실습을 위한 개발 환경을 셋팅할 수 있다.

### Step 1: 기본 환경 셋팅

```bash
git pull upstream main
cd hooks
npm install && npm run dev
```

### Step 2: API KEY 발급

실습에서 사용할 이미지 검색 API인 Pixabay의 API KEY를 발급받아야 합니다. 아래 순서대로 진행해주세요.

1. https://pixabay.com/api/docs/ 링크로 접속합니다.
2. 사이트에서 회원가입을 합니다.
3. 가입이 완료되면 발급된 API KEY를 확인하고 복사합니다.

### Step 3: 환경 변수 파일에 API KEY 추가하기

hooks 디렉토리에 있는 `.env` 파일 안에 아래와 같은 형식으로 Pixabay에서 발급받은 API KEY를 입력합니다.

```bash
VITE_PIXABAY_API_KEY={API_KEY}
```

API KEY를 안전하게 보관하고 사용하기 위해 환경변수로 설정하는 것입니다. 절대로 이 API KEY 값은 공개된 저장소에 업로드하지 않도록 주의합니다.

## 2단계 - useEffect 이해하고 적용하기

### 학습 목표

- useEffect 훅을 사용하여 컴포넌트 렌더링 후 데이터를 가져올 수 있다.
- 종속성 배열을 사용하여 useEffect 훅의 실행을 제어할 수 있다.

### Step 1: useEffect의 기본 개념 이해하기

`useEffect`는 외부 시스템과 컴포넌트를 동기화 해주기 위해 사용하는 리액트 훅입니다. 컴포넌트가 렌더링된 후에 실행되며, 주로 외부 데이터를 가져오거나 구독을 설정하는 등의 작업에 사용됩니다.

`useEffect`의 기본 구조는 다음과 같습니다:

```tsx
useEffect(() => {
  // 실행할 작업
  return () => {
    // 정리(cleanup) 작업
  };
}, [종속성 배열]);

```

- 첫 번째 인자로 실행할 작업을 정의하는 함수를 전달합니다.
- 함수 내부에서 반환하는 또 다른 함수는 정리(cleanup) 작업을 수행합니다. 이는 구독을 해제하거나 타이머를 제거하는 등의 작업에 사용됩니다.
- 두 번째 인자로 종속성 배열을 전달합니다. 이 배열에 포함된 값이 변경될 때마다 `useEffect`가 다시 실행됩니다. 빈 배열(`[]`)을 전달하면 컴포넌트가 처음 렌더링된 후에만 실행됩니다.

### **Step 2: 컴포넌트 렌더링 후 데이터 가져오기**

`useEffect`를 사용하여 컴포넌트가 렌더링된 후에 데이터를 가져오는 작업을 진행하는 예시 코드입니다.

```tsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("<https://api.example.com/data>");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);
```

- `useEffect` 내부에서 `fetchData` 함수를 정의하고 호출합니다.
- `fetchData` 함수는 비동기 함수로, API 호출을 통해 데이터를 가져옵니다.
- 가져온 데이터는 `setData` 함수를 사용하여 컴포넌트의 상태를 업데이트합니다.
- 종속성 배열이 빈 배열(`[]`)로 설정되어 있으므로, 이 `useEffect`는 컴포넌트가 처음 렌더링된 후에만 실행됩니다.

### **Step 3: 종속성 배열을 사용하여 useEffect 제어하기**

`useEffect`의 종속성 배열을 사용하여 특정 값이 변경될 때마다 실행할 수 있습니다.

```tsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.example.com/data?keyword=${keyword}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (keyword) {
    fetchData();
  }
}, [keyword]);
```

- 종속성 배열에 `keyword`를 포함시켰습니다. 따라서 `keyword` 값이 변경될 때마다 `useEffect`가 다시 실행됩니다.
- `keyword`가 존재할 때만 `fetchData` 함수를 호출하도록 조건문을 추가했습니다.

### **Step 4: 이미지를 불러오는 useEffect 작성해보기**

이제 직접 `useEffect`를 작성해볼 차례입니다. 주석을 보고 아래 코드의 `useEffect` 부분을 완성해보세요. 너무 막연하다면 다음 스텝의 코드를 참고해도 좋습니다.

```tsx
const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [keyword, setKeyword] = useState("");

  // useEffect를 사용하여 keyword가 변경될 때마다 이미지를 가져오는 로직을 작성해보세요.
  useEffect(() => {
    // 여기에 코드를 작성하세요.
    // 힌트:
    // 1. fetchImages 함수를 정의하세요.
    // 2. fetchImages 함수 내부에서 Pixabay API를 호출하여 이미지를 가져오세요.
    // 3. 가져온 이미지를 상태(images)에 업데이트하세요.
    // 4. keyword가 존재할 때만 fetchImages 함수를 호출하세요.
  }, [keyword]);

  // ...
};
```

코드를 작성한 후에는 아래의 코드와 비교해보기 바랍니다.

```tsx
useEffect(() => {
  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          keyword
        )}&image_type=photo&pretty=true`
      );
      const data = await response.json();
      setImages(data.hits);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  if (keyword) {
    fetchImages();
  }
}, [keyword]);
```

- `useEffect` 내부에서 `fetchImages` 함수를 정의하고 호출합니다.
- `fetchImages` 함수는 `keyword`를 사용하여 Pixabay API에서 이미지를 가져와야 합니다.
- 가져온 이미지는 `setImages` 함수를 사용하여 컴포넌트의 상태를 업데이트 합니다.

---

## 3단계 - **커스텀 훅** 만들기

### 학습 목표

- 커스텀 훅을 만들어 재사용 가능한 로직을 분리할 수 있다.
- 커스텀 훅을 사용하여 컴포넌트의 코드를 간결하게 만들 수 있다.

### **Step 1: 로직의 역할과 구성 요소 이해하기**

이미지 갤러리 컴포넌트에는 다음과 같은 주요 로직이 포함되어 있습니다.

- 이미지 데이터를 가져오는 로직 (`fetchImages` 함수)
- 검색 키워드 상태 관리 (`keyword` 상태와 `setKeyword` 함수)
- 이미지 데이터 상태 관리 (`images` 상태와 `setImages` 함수)

이러한 로직은 다른 컴포넌트에서도 유사하게 사용될 수 있습니다. 따라서 이를 커스텀 훅으로 추출하여 재사용성을 높일 수 있습니다.

### **Step 2: 커스텀 훅 만들기**

새로운 파일을 생성하고 커스텀 훅을 작성해봅시다. 예를 들어 `hooks` 디렉터리 하위에 `useImageSearch.ts`라는 파일을 생성하고 다음과 같이 작성할 수 있습니다.

```tsx
import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

const useImageSearch = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
            keyword
          )}&image_type=photo&pretty=true`
        );
        const data = await response.json();
        setImages(data.hits);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    if (keyword) {
      fetchImages();
    }
  }, [keyword]);

  return { images };
};

export default useImageSearch;
```

위의 코드에서 `useImageSearch` 커스텀 훅을 생성하였습니다. 이 훅은 `keyword`를 인자로 받아 이미지 데이터를 가져오는 로직을 수행합니다. 참고로 커스텀 Hook의 이름은 `use`로 시작하는 것이 일반적인 규칙입니다.

### **Step 3: 커스텀 훅 사용하기**

생성한 커스텀 Hook을 원래의 컴포넌트에서 사용하기 위해 다음과 같이 진행합니다.

1. 커스텀 Hook을 import 합니다.
2. 커스텀 Hook을 호출하고, 반환된 값을 구조 분해 할당으로 받아옵니다.

```tsx
import React, { useState } from "react";
import useImageSearch from "../hooks/useImageSearch";

const ImageGallery: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const { images } = useImageSearch(keyword);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(e.currentTarget.keyword.value);
  };

  return (
    // JSX 코드
  );
};

export default ImageGallery;

```

- `useImageSearch` 커스텀 Hook을 호출하고, `keyword`를 인자로 전달합니다.
- 커스텀 Hook에서 반환된 `images`, 값을 구조 분해 할당으로 받아옵니다.
- 컴포넌트 내부에서는 커스텀 Hook에서 반환된 값을 사용하여 UI를 렌더링합니다.

## **4단계 - useFetch 커스텀 훅 만들어보기**

### 학습 목표

- 데이터 fetching 로직을 별도의 커스텀 훅으로 분리할 수 있다.
- 로딩 상태와 에러 상태를 커스텀 훅에서 관리할 수 있다.

### **Step 1: 데이터 fetching 로직 이해하기**

이전 단계에서 만든 `useImageSearch` 훅을 살펴보면, 데이터를 가져오는 부분이 훅 내부에 포함되어 있습니다. 이 로직을 별도의 커스텀 훅으로 분리하여 재사용성을 높일 수 있습니다.

데이터 fetching 로직은 다음과 같은 역할을 합니다:

1. 주어진 URL을 사용하여 데이터를 가져옵니다.
2. 가져온 데이터를 상태로 관리합니다.
3. 로딩 상태와 에러 상태를 관리합니다.

### **Step 2: useFetch 훅 만들기**

새로운 파일을 생성하고 `useFetch` 훅을 작성해봅시다. 예를 들어 `hooks` 디렉터리 하위에 `useFetch.ts` 파일을 생성하고 다음과 같이 작성할 수 있습니다.

```tsx
// 힌트 버전
import { useState, useEffect } from "react";

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 여기에 데이터 fetching 로직을 작성하세요.
    // 힌트:
    // 1. isLoading 상태를 true로 설정하세요.
    // 2. try-catch 블록을 사용하여 데이터를 가져오세요.
    // 3. 가져온 데이터를 data 상태에 저장하세요.
    // 4. isLoading 상태를 false로 설정하세요.
    // 5. 에러가 발생한 경우 error 상태에 에러를 저장하세요.
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
```

위 코드에서 `useFetch` 훅을 생성하였습니다. 이 훅은 제네릭 타입 `T`를 사용하여 반환되는 데이터의 타입을 지정할 수 있습니다. 또한 `isLoading`과 `error` 상태를 추가하여 로딩 중이거나 에러가 발생한 경우를 처리할 수 있습니다.

### **Step 3: useFetch 훅 완성하기**

이제 `useFetch` 훅 내부에 데이터 fetching 로직을 작성해봅시다. 힌트를 참고하여 `useEffect` 내부를 완성해보세요.

```tsx
import { useState, useEffect } from "react";

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error as Error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
```

위의 코드는 `useFetch` 훅의 완성된 버전입니다. `useEffect` 내부에서 `fetchData` 함수를 정의하고 호출하여 데이터를 가져옵니다. 가져온 데이터는 `data` 상태에 저장되고, 로딩 중일 때는 `isLoading` 상태를 `true`로 설정합니다. 에러가 발생한 경우 `error` 상태에 에러를 저장합니다.

### **Step 4: useImageSearch 훅에서 useFetch 훅 사용하기**

이제 `useImageSearch` 훅에서 `useFetch` 훅을 사용하여 데이터 fetching 로직을 분리해봅시다.

```tsx
import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface ImageSearchResult {
  hits: Image[];
}

const useImageSearch = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const { data, isLoading, error } = useFetch<ImageSearchResult>(
    `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
      keyword
    )}&image_type=photo&pretty=true`
  );

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [data]);

  return { images, isLoading, error };
};

export default useImageSearch;
```

`useImageSearch` 훅에서 `useFetch` 훅을 사용하여 데이터를 가져오도록 수정하였습니다. `useFetch` 훅에서 반환된 `data`, `isLoading`, `error` 값을 사용하여 상태를 관리합니다. `data`가 변경되면 `useEffect` 내부에서 `images` 상태를 업데이트합니다.

이제 `useImageSearch` 훅은 데이터 fetching 로직과 분리되어 더욱 간결해졌습니다. 또한 `useFetch` 훅을 다른 곳에서도 재사용할 수 있게 되었습니다.

## 5단계 - **pagination을 위한 커스텀 훅 만들어보기**

### 학습 목표

- 페이지네이션 로직을 커스텀 훅으로 분리할 수 있다.
- 현재 페이지 상태와 페이지 이동 함수를 커스텀 훅에서 관리할 수 있다.

### **Step 1: 페이지네이션 커스텀 훅 개념 이해하기**

페이지네이션은 데이터를 여러 페이지로 나누어 표시하는 기능입니다. 이를 위해서는 현재 페이지 정보와 페이지 이동 기능이 필요합니다. 이러한 기능을 커스텀 훅으로 만들어 재사용할 수 있습니다.

페이지네이션 커스텀 훅에 필요한 기능은 다음과 같습니다:

1. 현재 페이지 상태 관리
2. 다음 페이지로 이동하는 함수
3. 이전 페이지로 이동하는 함수

### **Step 2: 페이지네이션 커스텀 훅 만들기**

`hooks` 디렉터리에 `usePagination.ts` 파일을 생성하고 다음과 같이 작성해봅시다.

```tsx
import { useState } from "react";

const usePagination = (initialPage: number = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // 여기에 페이지네이션 관련 함수를 작성하세요.
  // 힌트:
  // 1. 다음 페이지로 이동하는 함수를 작성하세요.
  // 2. 이전 페이지로 이동하는 함수를 작성하세요.
  // 3. 이전 페이지로 이동할 때는 현재 페이지가 1보다 작아지지 않도록 주의하세요.

  return { currentPage, goToNextPage, goToPrevPage };
};

export default usePagination;
```

위 코드에서 `usePagination` 커스텀 훅을 생성하였습니다. 이 훅은 `initialPage` 매개변수를 통해 초기 페이지 값을 설정할 수 있습니다. 기본값은 1입니다.

힌트를 참고하여 페이지네이션 관련 함수를 작성해보세요.

### **Step 3: 페이지네이션 커스텀 훅 완성하기**

```tsx
import { useState } from "react";

const usePagination = (initialPage: number = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return { currentPage, goToNextPage, goToPrevPage };
};

export default usePagination;
```

위 코드는 `usePagination` 커스텀 훅의 완성된 버전입니다. `goToNextPage` 함수는 현재 페이지를 1 증가시키고, `goToPrevPage` 함수는 현재 페이지를 1 감소시킵니다.

단, `goToPrevPage` 함수에서는 `Math.max`를 사용하여 현재 페이지가 1보다 작아지지 않도록 처리하였습니다.

### **Step 4: 페이지네이션 커스텀 훅 사용하기**

이제 `ImageGallery` 컴포넌트에서 `usePagination` 커스텀 훅을 사용해봅시다.

```tsx
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
```

`usePagination` 커스텀 훅을 사용하여 `currentPage`, `goToNextPage`, `goToPrevPage`를 가져왔습니다. 이를 사용하여 현재 페이지를 표시하고, 이전/다음 페이지로 이동할 수 있는 버튼을 렌더링하였습니다.

마지막으로 `useImageSearch` 커스텀 훅에서 `page` 매개변수를 받아 API 요청 시 페이지 정보를 포함하도록 수정해야 합니다.

```tsx
const useImageSearch = (keyword: string, page: number) => {
  // ...
  const { data, isLoading, error } = useFetch<ImageSearchResult>(
    `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
      keyword
    )}&page=${page}&image_type=photo&pretty=true`
  );
  // ...
};
```

이제 `usePagination` 커스텀 훅을 사용하여 이미지 갤러리에 페이지네이션 기능을 추가하였습니다. 현재 페이지 정보와 이전/다음 페이지로 이동하는 버튼이 렌더링되고, 페이지 이동 시 해당 페이지의 이미지가 표시됩니다.

## 6단계 - **커스텀 훅 조합하기**

### 학습 목표

- 여러 개의 커스텀 훅을 조합하여 더 복잡한 로직을 처리할 수 있다.
- 커스텀 훅 조합을 통해 코드의 재사용성을 높일 수 있다.

이번에는 여러 개의 커스텀 Hook을 조합하여 더 복잡한 로직을 처리할 단계입니다. 작은 단위의 커스텀 Hook을 조합하면 코드의 재사용성을 극대화할 수 있습니다.

### **Step 1: 커스텀 훅 조합하기**

`useImageSearch`와 `usePagination` 커스텀 훅을 조합하여 `useImageSearchWithPagination` 커스텀 훅을 만들어봅시다. 이 훅은 이미지 검색과 페이지네이션 기능을 모두 포함합니다.

```tsx
// useImageSearchWithPagination.ts
import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import usePagination from "./usePagination";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface ImageSearchResult {
  hits: Image[];
}

const useImageSearchWithPagination = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const { currentPage, goToNextPage, goToPrevPage } = usePagination();

  // 여기에 useFetch를 사용하여 이미지 데이터를 가져오는 로직을 작성하세요.
  // 힌트:
  // 1. useFetch 훅을 사용하여 이미지 데이터를 가져오세요.
  // 2. 가져온 이미지 데이터를 images 상태에 저장하세요.
  // 3. keyword와 currentPage가 변경될 때마다 이미지 데이터를 다시 가져오도록 종속성 배열을 설정하세요.

  return { images, currentPage, goToNextPage, goToPrevPage, isLoading, error };
};

export default useImageSearchWithPagination;
```

위 코드에서 `useImageSearchWithPagination` 커스텀 훅을 생성하였습니다. 이 훅은 `useImageSearch`와 `usePagination` 훅을 조합하여 이미지 검색과 페이지네이션 기능을 제공합니다.

힌트를 참고하여 `useImageSearchWithPagination`를 사용하는 부분을 완성해보세요.

### **Step 2: 커스텀 훅 조합 완성하기**

```tsx
// useImageSearchWithPagination.ts
import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import usePagination from "./usePagination";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

interface ImageSearchResult {
  hits: Image[];
}

const useImageSearchWithPagination = (keyword: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const { currentPage, goToNextPage, goToPrevPage } = usePagination();
  const { data, isLoading, error } = useFetch<ImageSearchResult>(
    `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
      keyword
    )}&page=${currentPage}&image_type=photo&pretty=true`
  );

  useEffect(() => {
    if (data) {
      setImages(data.hits);
    }
  }, [data]);

  return { images, currentPage, goToNextPage, goToPrevPage, isLoading, error };
};

export default useImageSearchWithPagination;
```

위 코드는 `useImageSearchWithPagination` 커스텀 훅을 구현한 코드입니다. `useFetch` 훅을 사용하여 이미지 데이터를 가져오고, `useEffect` 훅을 사용하여 가져온 데이터를 `images` 상태에 저장합니다. `keyword`와 `currentPage`가 변경될 때마다 이미지 데이터를 다시 가져오도록 `useFetch` 훅의 URL에 해당 값을 포함시켰습니다.

### **Step 3: 조합된 커스텀 훅 사용하기**

이제 `ImageGallery` 컴포넌트에서 `useImageSearchWithPagination` 커스텀 훅을 사용해봅시다.

```tsx
import React, { useState } from "react";
import useImageSearchWithPagination from "../hooks/useImageSearchWithPagination";

const ImageGallery: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const { images, currentPage, goToNextPage, goToPrevPage } =
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
        <div>
          <span>Page: {currentPage}</span>
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button onClick={goToNextPage}>Next Page</button>
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
```

`useImageSearchWithPagination` 커스텀 훅을 사용하여 이미지 검색과 페이지네이션 기능을 모두 사용할 수 있습니다. `images`, `currentPage`, `goToNextPage`, `goToPrevPage`, `isLoading`, `error` 값을 훅에서 반환받아 사용합니다.

이제 `ImageGallery` 컴포넌트에서 이전/다음 페이지로 이동하는 버튼과 현재 페이지 정보를 표시할 수 있습니다. 또한 로딩 중이거나 에러가 발생한 경우에 대한 처리도 추가되었습니다.

이렇게 커스텀 훅을 조합하여 더 복잡한 로직을 처리할 수 있습니다. 작은 단위의 커스텀 훅을 잘 설계하고 조합하면 코드의 재사용성과 가독성을 크게 향상시킬 수 있습니다. 물론 우리는 늘 중요하게 고려해야할 점이 있습니다. 바로 커스텀 훅을 만들 때 너무 많은 로직을 한 곳에 몰아넣지 않는 것입니다.

커스텀 훅은 작은 단위의 로직을 재사용하기 위한 것이므로, 한 가지 역할에만 집중하도록 설계하는 것이 좋습니다. 과도한 중첩은 복잡도를 불필요하게 증가시켜 유지보수를 어렵게 만듭니다. 따라서 간결하고, 명확하게 책임을 분리하여 커스텀 훅을 조합하는 것이 중요하다는 것을 기억해주세요!
