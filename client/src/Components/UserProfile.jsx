import React from 'react';
import BasicInfo from './BasicInfo';
import FootPrintChart from './FootprintChart';
import Feed from './Feed';
import '../UserProfile.css';
 

let UserProfile = () => {
    return(
      <div>
        <BasicInfo />
        <FootPrintChart />
        <Feed />
      </div>
    ); 
}

export default UserProfile;

