# components 기본 실습

## step1. 기본 함수형 컴포넌트 만들어보기

주어진 class component를 function component로 리팩터링합니다.

```react
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>카운트: {this.state.count} </p>
        <button onClick={this.increment}>증가</button>
      </div>
    );
  }
}
```

## step2. 함수형 컴포넌트 만들어보기 (useState, useEffect)

주어진 class component의 메서드를 고려하여, react의 hook을 이용한 function component로 리팩터링 해봅니다.

```react
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    this.setState({ posts });
  };

  render() {
    const { posts } = this.state;

    return (
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

```

## step3. customHook을 만드는 컴포넌트 만들어보기

커스텀 훅을 이용하여 UI와 비즈니스 로직을 분리하여 컴포넌트를 만들어봅니다.

```react
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name") || ""
    };
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value }, () => {
      localStorage.setItem("name", this.state.name);
    });
  };

  render() {
    return (
      <div>
        <h1>안녕하세요, {this.state.name}님!</h1>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default App;
```

## step4. 종합 미션

원하는 이미지를 검색하는 애플리케이션 함수형으로 만들고, 커스텀 훅까지 분리해봅니다.

```react
const API_KEY = "35260376-5ce7ccb608fac3a56eefe111d";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      data: [],
      loading: false,
      error: null
    };
  }

  fetchData = async (keyword) => {
    this.setState({ loading: true });
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          keyword
        )}&image_type=photo&pretty=true`
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const result = await response.json();

      this.setState({
        data: result.hits.map((hit) => ({
          id: hit.id,
          url: hit.previewURL,
          title: hit.tags
        }))
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.keyword !== this.state.keyword) {
      this.fetchData(this.state.keyword);
    }
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ keyword: e.target.elements.keyword.value });
  };

  render() {
    const { data, loading, error } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input type="text" name="keyword" placeholder="키워드 검색" />
          <button type="submit">검색</button>
        </form>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            {data.map((image) => (
              <img key={image.id} src={image.url} alt={image.title} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

```
