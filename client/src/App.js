import React, { Component } from 'react';
import './App.css';

import axios from 'axios'

import UserProfile from './Components/UserProfile';


class App extends Component {

  componentWillMount(){
    axios.get('indexRouter/test')
    .then((res)=>{console.log(res)})
  }
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
