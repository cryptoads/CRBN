import React, {Component} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'; 
import UserPage from './Components/UserPage';
import MainApp from './Components/MainApp';

import LeaderBoard from './Components/LeaderBoard';

import EventsList from './Components/EventsList';




class App extends Component {


  render() {
    return (
      <div>
      <Switch>
      <Route exact path="/leaderboards" component={LeaderBoard} />
      <Route path="/userprofile/:id" component={UserPage} />
      <Route exact path="/" component={MainApp} />
      <Route exact path="/events" component={EventsList} />
      </Switch>
      </div>
    );
  }

}

export default App;
