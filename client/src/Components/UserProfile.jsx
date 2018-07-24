import React, { Component } from 'react';
import BasicInfo from './BasicInfo';
import FootPrintChart from './FootprintChart';
import Feed from './Feed';
import EditModal from './EditModal';
import '../UserProfile.css';
 



class UserProfile extends Component {
  
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      basicInfoObj: {
        name: 'Joe Leafdriver',
        city: 'Atlanta',
        state: 'GA',
        joinedMonth: 'May',
        joinedYear: '2018',
        bio: `I'm just your average LEAF-driving, Earth-saving kinda guy.`,
        imgUrl: './img/placeholder-img.jpg'
      }
    }
  }
    
  render() {
    return(
      <div>
        <EditModal isLoggedIn={this.state.loggedIn} />
        <BasicInfo isLoggedIn={this.state.loggedIn} basicInfo={this.state.basicInfoObj} />
        <FootPrintChart isLoggedIn={this.state.loggedIn} />
        <Feed isLoggedIn={this.state.loggedIn} />
      </div>
    ); 
  }
}

export default UserProfile;

