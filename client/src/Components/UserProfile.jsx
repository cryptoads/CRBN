import React, { Component } from 'react';
import BasicInfo from './BasicInfo';
import FootPrintChart from './FootprintChart';
import Feed from './Feed';
import ChartDataModal from './ChartDataModal';
import '../UserProfile.css';
import axios from 'axios';
import grid from '../grid.json';
 
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
        crbnScore: null,
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
      userData: {
        crbnScore: 'calculating...'
       }
    }
  }
    
  render() {
    return(
      <div className="container-fluid">
        <ChartDataModal loggedIn={this.props.loggedIn} chartData={this.state.chartDataObj} />
        <BasicInfo loggedIn={this.props.loggedIn} basicInfo={this.state.basicInfoObj} />
        <FootPrintChart crbnScore={this.state.chartDataObj.crbnScore} loggedIn={this.props.loggedIn} chartData={this.state.chartDataObj} />
      </div>
    ); 
  }

  componentWillMount() {
    axios.get('/test')
    .then((res) => {
      this.setState({ userData: res}); // set userData state with info from DB

      if (this.props.loggedIn) {     
        let user = {...this.state.userData.data.data} // make a copy of user data 
        this.calculateScore(user)
      }
    });
  }

  calculateScore(user) {
    /*======================================
    CRBN Score Equation
    =======================================*/
    /* Set up variables for CRBN score equation */
    let maintenance = user.maintenance;
    let mpg = (user.mpg);
    let milesDriven = (user.miles_driven);
    let aluminum = user.aluminum;
    let plastic = user.plastic;
    let glass = user.glass;
    let paper = user.paper;

    /*Individual variables that make up the CRBN score */
    let vehiclecO2;
    let wastecO2 = 700; // baseline is 700. reduces based on recycling habits
    let homecO2;

    /* Vehicle cO2 calculations */
    if (maintenance == true) {
      vehiclecO2 = Math.round((((milesDriven / mpg) * 19.59) / 2204.62));
    } else {
      vehiclecO2 = Math.round((((milesDriven / mpg) * 19.59) / 2204.62) * (1.04));
    }
    console.log('vehicle cO2 is ' + vehiclecO2)
    
    /*Waste cO2 calculations */
    let recyclingScores = {
      aluminum: 90,
      plastic: 35, 
      glass: 25,
      paper: 125
    }

    for (var key in recyclingScores) {
      if ( user[key] == true) {
        wastecO2 = wastecO2 - recyclingScores[key];
      } else {
        wastecO2 = wastecO2;
      }
    }

    console.log('waste cO2 is ' + wastecO2)

    /* Get the output rate */ 
    let getOutputRate = (zip) => {
      let zipsAndRates = grid;
      let theEntry = zipsAndRates.find(entry => {
        return entry.zip == zip; 
      });
      return theEntry.output_rate;
    }
    
    /* Home cO2 calculations */
    let outputRate = getOutputRate(user.zip);
    console.log('the output rate is ' + outputRate);
    let natGasBill = user.natgas_bill; 
    let electricBill = user.electric_bill;
    let natgascO2 = (((natGasBill / 10.68) * 119.58) * 12) / 2204.62;
    let electriccO2 = ((electricBill / .119) * (outputRate) * 12) / 2204.62;
    homecO2 = natgascO2 + electriccO2; 

    console.log('home cO2 is ' + homecO2);
    
    /* Final Score */
    let roundedScores = {
      vehicle: Math.round(vehiclecO2 * 100) / 100,
      waste: Math.round(wastecO2 * 100) / 100,
      home: Math.round(homecO2 * 100) / 100
    }
    let thecrbnScore = roundedScores.vehicle + roundedScores.waste + roundedScores.home;

    this.setState( { 
      chartDataObj: {
        crbnScore: thecrbnScore,
        datasets: [{
            data: [roundedScores.vehicle, roundedScores.home, roundedScores.waste],
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
  }); 

    console.log('The CRBN score is: ' + thecrbnScore); 
    
  }
}

export default UserProfile;

