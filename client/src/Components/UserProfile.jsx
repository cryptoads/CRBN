import React from 'react';
import BasicInfo from './BasicInfo';
import FootPrintChart from './FootprintChart';
import Feed from './Feed';
import '../UserProfile.css';
 



let UserProfile = () => {
    let basicInfo = {
        name: 'Joe Leafdriver',
        city: 'Atlanta',
        state: 'GA',
        joinedMonth: 'May',
        joinedYear: '2018',
        bio: `I'm just your average LEAF-driving, Earth-saving kinda guy.`,
        imgUrl: './img/placeholder-img.jpg'
    };
    return(
      <div>
        <BasicInfo info={basicInfo} />
        <FootPrintChart />
        <Feed />
      </div>
    ); 
}

export default UserProfile;

