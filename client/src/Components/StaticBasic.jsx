
import React, {Component} from 'react';
import axios from 'axios';


    
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
    return (<div className="mt-5">
              <img alt="profile-pic" className='profile-picture' src={basicInfo.imgUrl} />
              <p className="username">
                {basicInfo.name} 
              </p>
              <div className="profile-info basic-info-text">
                <span>
                  Intro:
                </span>
                <br />
                <small className="intro">{basicInfo.intro}</small>
                <hr />
                <small>Member since {basicInfo.joinedMonth}, {basicInfo.joinedYear}</small>
              </div>
            </div>)
  }

}


export default StaticBasic;

