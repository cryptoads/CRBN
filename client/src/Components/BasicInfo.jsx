import React from 'react';
 

let BasicInfo = (props) => {
    let profileInfo = props.basicInfo;
    let loginState = props.loggedIn;
    return(
    <div className="basic-info-container col-4">
      <img alt="profile-pic" className='profile-picture' src={profileInfo.imgUrl} />
      <p>{profileInfo.name}</p>
      <span className='edit-info-link'>{ loginState !== false ? 'Edit Basic Info' : '' }</span>
      <div className="profile-info basic-info-text">
        <p>Intro:</p>
        <small>{profileInfo.bio}</small>
        <p>Lives in {profileInfo.city}, {profileInfo.state}</p>
        <p>Member since {profileInfo.joinedMonth}, {profileInfo.joinedYear}</p>
      </div>
    </div>
    ); 
}

export default BasicInfo;

