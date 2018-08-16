import React, { Component } from 'react';
import AppHeader from './AppHeader';
import LoginPageHeader from './LoginPageHeader';
import Login from './Login';
import UserProfile from './UserProfile';
import axios from 'axios'

class MainApp extends Component {
  constructor() {
    super();
    this.state = { loggedIn: false }
    this.logout = this.logout.bind(this);

  }

  render() {
    let MainJSX;

    if (this.state.loggedIn) {
      MainJSX = (<div className="App">
        <AppHeader logout={this.logout} />
        {this.state.loggedIn == true ? <UserProfile loggedIn={this.state.loggedIn} logout={this.logout} /> : <Login className="login"></Login>}
      </div>)
    } else {
      MainJSX = (<div className="App">
        <LoginPageHeader />
        <Login className="login"></Login>}
    </div>)
    }

    return (
      MainJSX
    )
  }

  componentWillMount() {
    axios.get('/test')
      .then((res) => {
        this.setState({ loggedIn: res.data.loggedIn })
        console.log(this.state.loggedIn)
        console.log(res)
      })
  }

  logout(event) {
    event.preventDefault();
    axios({ url: '/logout', method: 'get' })
      .then((res) => { this.setState({ loggedIn: res.loggedIn }) })
      .then(err => console.error(err));
  }
}

export default MainApp;