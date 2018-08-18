import React, { Component } from 'react';
import axios from 'axios';

class AppHeader extends Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }

  render() {
    let { loggedIn } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CRBN</h1>
          {loggedIn ? <button className="appBtn" onClick={this.logout.bind(this)}>Log Out</button> :
            <a href='/'><button className="appBtn">Log In</button></a>}
        </header>
      </div>
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
      .then(err => console.error(err))
      .then(window.location.reload())
  }
}

export default AppHeader; 