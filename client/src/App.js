import React, {Component} from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './Components/Login';
import UserProfile from './Components/UserProfile';
import EventsList from './Components/EventsList';

class App extends Component {
  constructor() {
    super();
    this.state = {loggedIn: false};
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    axios.get('/test').then(res => {
      this.setState({loggedIn: res.data.loggedIn});
      console.log(this.state.loggedIn);
      console.log(res);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CRBN</h1>
          {this.state.loggedIn ? (
            <React.Fragment>
              <Link to="events">Events</Link>
              <Route path="/events" component={EventsList} />
              <button className="appBtn" onClick={this.logout}>
                Log Out
              </button>
            </React.Fragment>
          ) : (
            ''
          )}
        </header>
        {this.state.loggedIn == true ? (
          <UserProfile loggedIn={this.state.loggedIn} />
        ) : (
          <Login className="login" />
        )}
      </div>
    );
  }

  logout(event) {
    event.preventDefault();
    axios({url: '/logout', method: 'get'})
      .then(res => {
        this.setState({loggedIn: res.loggedIn});
      })
      .then(err => console.error(err));
  }
}

export default App;
