import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {

  componentWillMount(){
    axios.get('indexRouter/test')
    .then((res)=>{console.log(res)})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <a href="http://localhost:3001/login">test</a>
          <a href="http://localhost:3001/logout">logout</a>
        </p>
      </div>
    );
  }
}

export default App;
