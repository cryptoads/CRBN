import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserProfile from './Components/UserProfile';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CRBN</h1>
        </header>
        <UserProfile />
      </div>
    );
  }
}

export default App;
