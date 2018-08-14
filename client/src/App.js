import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom'; 
import UserPage from './Components/UserPage';
import MainApp from './Components/MainApp';


class App extends Component {


  render() {
    return (
      <div>
      <Switch>
      <Route path="/test/:id" component={UserPage} />
      <Route path="/" component={MainApp} />
      </Switch>
      </div>
    );
  }

}

export default App;
