import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Login from './Components/Login';
import UserProfile from './Components/UserProfile';

class App extends Component {
  constructor() {
    super();
    this.state = { loggedIn: false }
    this.logout = this.logout.bind(this);

  }

  componentWillMount() {
    axios.get('/test')
    .then((res)=>{
      this.setState({loggedIn: res.data.loggedIn})
      console.log(this.state.loggedIn)
      console.log(res)
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CRBN</h1>
          { this.state.loggedIn ? <button className="appBtn" onClick={this.logout}>Log Out</button> : "" }
          <button className="appBtn">Login</button>
        </header>
        {this.state.loggedIn == true ? <UserProfile loggedIn = {this.state.loggedIn}  /> : <Login className="login"></Login>}   
      </div>
    );
  }

  logout(event) {
    event.preventDefault();
    axios({url: '/logout', method: 'get'})
    .then((res)=>{this.setState({ loggedIn: res.loggedIn })})
    .then( err => console.error(err)); 
  }
}


export default App;
