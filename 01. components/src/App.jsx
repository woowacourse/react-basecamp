import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
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

export default App;
