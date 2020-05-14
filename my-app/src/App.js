import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dogs from './Dogs.js';
import CreateDog from './CreateDog.js';
const baseUrl = 'https://cax8xrcb2j.execute-api.us-west-2.amazonaws.com/dev';

class App extends Component {
  constructor() {
    super();
    this.state = { dogs: [] }
  }
  async componentDidMount() {
    const response = await fetch(`${baseUrl}/dogs`);
    if (response.ok) {
      const json = await response.json();
      this.setState({ dogs: json.dogs });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Dogbook
        </p>
        </header>
        <CreateDog />
        <Dogs dogs={this.state.dogs} />
      </div>
    );
  }
}

export default App;
