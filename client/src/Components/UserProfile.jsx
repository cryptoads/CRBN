import React, { Component } from 'react';
import BasicInfo from './BasicInfo';
import FootPrintChart from './FootprintChart';
import Feed from './Feed';
import ChartDataModal from './ChartDataModal';
import '../UserProfile.css';
import axios from 'axios';
 
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
      },
      userData: { }
    }
  }
    
  render() {
    return(
      <div className="container-fluid">
        <ChartDataModal loggedIn={this.props.loggedIn} chartData={this.state.chartDataObj} />
        <BasicInfo loggedIn={this.props.loggedIn} basicInfo={this.state.basicInfoObj} />
        <FootPrintChart loggedIn={this.props.loggedIn} chartData={this.state.chartDataObj}/>
      </div>
    ); 
  }


  
  componentWillMount() {
    axios.get('/test')
    .then((res)=> {
      this.setState({ userData: res}); // set userData state with info from DB

      if (this.props.loggedIn) {
      
      let theData = {...this.state.userData.data.data} // make a copy of user data 
      
      /* Set up variables for CRBN score equation */
      let maintenance = theData.maintenance;
      let mpg = theData.mpg;
      let milesDriven = theData.milesDriven;
      let aluminum = theData.aluminum;
      let plastic = theData.plastic;
      let glass = theData.glass;
      let paper = theData.paper;

      /*Individual variables that make up the CRBN score */
      let vehiclecO2;
      let wastecO2 = 700;
      let homecO2;

      /* Vehicle cO2 calculations */
      if (maintenance == true) {
        let vehiclecO2 = (((milesDriven / mpg)*19.59)/2204.62)
      } else {
        let vehiclecO2 = (((milesDriven/mpg)*19.59)/2204.62)*(1.04)
      }
      
      /*Waste cO2 calculations */
      let recyclingScores = {
        aluminum: 90,
        plastic: 35, 
        glass: 25,
        paper: 125
      }

      theData.aluminum == true;

      for (var key in recyclingScores) {
        if ( theData[key] == true) {
          wastecO2 = wastecO2 - recyclingScores[key];
          console.log(theData.data.data[key]);
        } else {
          wastecO2 = wastecO2;
        }
      }
    }
      


      
      

    })
  }

}

export default UserProfile;

