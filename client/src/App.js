import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom'; 
import UserPage from './Components/UserPage';
import MainApp from './Components/MainApp';
import LeaderBoard from './Components/LeaderBoard';


class App extends Component {


  render() {
    return (
      <div>
      <Switch>
      <Route exact path="/test/:id" component={UserPage} />
      <Route exact path="/" component={MainApp} />
      <Route exact path="/leaderboards" component={LeaderBoard} />
      </Switch>
      </div>
    );
  }

}

export default App;
