import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom'; 
import UserPage from './Components/UserPage';
import MainApp from './Components/MainApp';

import LeaderBoard from './Components/LeaderBoard';

import EventsList from './Components/EventsList';
import Event from './Components/Event';



class App extends Component {


  render() {
    return (
      <div>
      <Switch>

      <Route exact path="/leaderboards" component={LeaderBoard} />

      <Route path="/test/:id" component={UserPage} />
      <Route exact path="/" component={MainApp} />
      <Route exact path="/events" component={EventsList} />
      <Route exact path="/events/:id" component={Event} />

      </Switch>
      </div>
    );
  }

}

export default App;
