import React from 'react';
 

let BasicInfo = (props) => {
    let profileInfo = props.basicInfo;
    let loginState = props.loggedIn;

    return(
    <div className="basic-info-container col-sm-12 col-md-4 col-lg-4">
      <img alt="profile-pic" className='profile-picture' src={profileInfo.imgUrl} />
      <p>{profileInfo.name}</p>
      {console.log(loginState)}
      <span className='edit-info-link'>{ loginState !== false ? 'Edit Basic Info' : '' }</span>
      <div className="profile-info basic-info-text">
        <p>Intro:</p>
        <small>{profileInfo.intro}</small>
        <p>Member since {profileInfo.createdAt}</p>
      </div>
    </div>
    ); 
}

export default BasicInfo;

