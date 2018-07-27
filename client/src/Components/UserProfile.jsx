import React, { Component } from 'react';
import BasicInfo from './BasicInfo';
import FootPrintChart from './FootprintChart';
import Feed from './Feed';
import ChartDataModal from './ChartDataModal';
import '../UserProfile.css';
 
class UserProfile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      basicInfoObj: {
        name: 'Joe Leafdriver',
        city: 'Atlanta',
        state: 'GA',
        joinedMonth: 'May',
        joinedYear: '2018',
        bio: `I'm just your average LEAF-driving, Earth-saving kinda guy.`,
        imgUrl: './img/placeholder-img.jpg'
      },
      chartDataObj: {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor : [
              '#08E6C8','#472029', '#a7ed9c' 
            ],
        }],
    
         labels: [
            'Vehicle',
            'Home',
            'Waste'
          ]
      }
    }
  }
    
  render() {
    return(
      <div className="container-fluid">
        {console.log(this.props.loggedIn)}
        <ChartDataModal loggedIn={this.props.loggedIn} chartData={this.state.chartDataObj} />
        <BasicInfo loggedIn={this.props.loggedIn} basicInfo={this.state.basicInfoObj} />
        <FootPrintChart loggedIn={this.props.loggedIn} chartData={this.state.chartDataObj}/>
      </div>
    ); 
  }

}

export default UserProfile;

