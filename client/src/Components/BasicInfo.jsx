import React from 'react';
 

let BasicInfo = (props) => {
    let profileInfo = props.basicInfo;
    return(
    <div className="basic-info-container">
      <img alt="profile-pic" className='profile-picture' src={profileInfo.imgUrl} />
      <p>{profileInfo.name}</p>
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

