import React, { Component } from 'react';
import './App.css';

import axios from 'axios'

import UserProfile from './Components/UserProfile';


class App extends Component {

  componentWillMount(){
    axios.get('/test')
    .then((res)=>{console.log(res)})
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CRBN</h1>
        </header>

        <UserProfile loggedIn={false} />
      </div>
    );
  }
}

export default App;
