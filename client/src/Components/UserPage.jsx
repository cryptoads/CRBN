import React, { Component } from 'react';
import StaticBasic from './StaticBasic';
import StaticFootprint from './StaticFootprint';
import '../UserProfile.css';
import axios from 'axios';
import grid from '../grid.json';

 
class UserPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      basicInfoObj: {

      },
      chartDataObj: {
        showChart: false,
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
      userData: { }
    }
  }
    
  render() {
    return(

      <div className="container-fluid" >
        <div className="Row">

        <StaticBasic id={this.state.userData.id} loggedIn={this.props.loggedIn} basicInfo={this.state.basicInfoObj} />
        <StaticFootprint crbnScore={this.state.chartDataObj.crbnScore} loggedIn={this.props.loggedIn} chartData={this.state.chartDataObj} />
        </div>
     </div>
    ); 
  }



  componentWillMount() {
    var id = this.props.match.params
    console.log(id)
    axios.get('/test/' + id.id)
    .then((res) => {
      this.setState({ userData: res.data}); // set userData state with info from DB     
        let user = {...this.state.userData} // make a copy of user data

            this.setState( {
              basicInfoObj:  {
                name: user.data.username,
                city: user.data.city,
                state: user.data.state,
                joinedMonth: 'May',
                joinedYear: '2018',
                intro: user.data.intro,
                imgUrl: user.data.imgUrl,
                createdAt: user.data.createdAt
              }        
          });

        let chartDataComplete = () => {
          let itemsToCheck =  [ 'aluminum', 'electric_bill', 'glass', 'maintenance', 
            'miles_driven', 'mpg', 'natgas_bill', 'paper', 'plastic', 'zip']; 
          for (var key in user) {
            if (itemsToCheck.includes(key) && (user.key == null || user.key == "")) {
              return false;
            } else if (key == 'zip' && user.key == 0) {
              return false; 
            } else {
              return true;
            }
          }
      }
        let chartCheck = chartDataComplete();
        console.log(`chart check is ${chartCheck}`)
        if (chartCheck !== false) { 
          this.calculateScore(user)
        }
      
    });
}

  updateChart() {
    var id = this.props.match.params
    console.log('chart update initiated')
    axios.get('/test/' +id.id)
    .then( res => {return res.data.data} )
    .then( userData => this.calculateScore(userData)); 
  }

  calculateScore(user) {
    /************************
    * CRBN Score Equation
    *************************/
    console.log(user)
    /* Set up variables for CRBN score equation */
    let maintenance = user.data.maintenance;
    let mpg = user.data.mpg;
    let milesDriven = user.data.miles_driven;
    let aluminum = user.data.aluminum;
    let plastic = user.data.plastic;
    let glass = user.data.glass;
    let paper = user.data.paper;
    let householdMembers = user.data .household_members;

    /*Individual variables that make up the CRBN score */
    let vehiclecO2;
    let wastecO2 = 700; // baseline is 700. reduces based on recycling habits
    let homecO2;

    /* Vehicle cO2 calculations */
    if (maintenance == true) {
      vehiclecO2 = (((milesDriven / mpg) * 19.59) / 2204.62);
    } else {
      vehiclecO2 = (((milesDriven / mpg) * 19.59) / 2204.62) * (1.04);
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

    wastecO2 = wastecO2 / 2204.62;


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
    let outputRate = getOutputRate(user.data.zip);
    console.log('the output rate is ' + outputRate);
    let natGasBill = user.data.natgas_bill; 
    let electricBill = user.data.electric_bill;
    let natgascO2 = (((natGasBill / 10.68) * 119.58) * 12) / 2204.62;
    let electriccO2 = ((electricBill / .119) * (outputRate) * 12) / 2204.62;
    homecO2 = (natgascO2 + electriccO2) / householdMembers; 

    console.log('home cO2 is ' + homecO2);

    function round(num, places) {
      var multiplier = Math.pow(10, places);
      return Math.round(num * multiplier) / multiplier;
    }
    
    /* Final Score */
    let roundedScores = {
      vehicle: round(vehiclecO2, 2),
      waste: round(wastecO2, 2),
      home: round(homecO2, 2)
    }
    let thecrbnScore = round(((roundedScores.vehicle + roundedScores.waste + roundedScores.home) * 100) / 100, 2);

    let thechartDataObj =
      {
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


    this.setState({chartDataObj: thechartDataObj}); 

    console.log('The CRBN score is: ' + thecrbnScore); 
    return thechartDataObj; 
    
  }
}

export default UserPage;
