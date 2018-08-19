
import React, {Component} from 'react';
import axios from 'axios';
import "../BasicInfo.css";


    
class StaticBasic extends Component 
{

  constructor(props)
  {
    super(props);
    this.state = {id: this.props.id}
  }

  render(props) 
  {  
    let basicInfo = this.props.basicInfo;
    let loggedIn = this.props.loggedIn;
    return (
      <div className="basic-info-container col-12">
        <div className="profile-info basic-info-text">
          <img
            alt="profile-pic"
            className="profile-picture"
            src={basicInfo.imgUrl}
          />
          <hr />

          <p className="username">{basicInfo.name}</p>
          <span>Intro:</span>
          <br />
          <p className="intro">{basicInfo.intro}</p>
          <hr />
          <small>
            Member since {basicInfo.joinedMonth}, {basicInfo.joinedYear}
          </small>
        </div>
      </div>
    );
}

}


export default StaticBasic;

