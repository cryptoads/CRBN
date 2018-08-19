import React, { Component } from "react";
import BasicInfo from "./BasicInfo";
import FootPrintChart from "./FootprintChart";
import EventsList from "./EventsList";
import ChartDataModal from "./ChartDataModal";
import "../UserProfile.css";
import axios from "axios";
import grid from "../grid.json";
import ProfileImg from "../ProfileImg.js";
import UserEvents from "./UserEvents";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      basicInfoObj: {},
      badges: [],
      chartDataObj: {
        showChart: false,
        crbnScore: null,
        datasets: [
          {

            data: [10, 20, 30 , 0],
            backgroundColor: ['#FF0000', '#666699', '#ffff00', '#470000'],
            borderColor: ["#000000", "#000000", "#000000", "#000000"]
          },
        ],

        labels: ['Vehicle', 'Home', 'Waste', 'Events'],
      },
      userData: {}
    };
    this.setUserBadges = this.setUserBadges.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.setRegisteredEvents = this.setRegisteredEvents.bind(this);
  }

  render() {
    return (
      <div className="container-fluid" style={ProfileImg}>
        <div className="row">
          <ChartDataModal
            updateChart={this.updateChart.bind(this)}
            loggedIn={this.props.loggedIn}
            chartData={this.state.chartDataObj}
          />
          <div className="col-sm-12 col-md-3 col-lg-3">

          <BasicInfo
            id={this.state.userData.id}
            loggedIn={this.props.loggedIn}
            basicInfo={this.state.basicInfoObj}
          />
          <EventsList id={this.state.userData.id} setUserBadges={this.setUserBadges} setRegisteredEvents={this.setRegisteredEvents} />

          </div>
          <div className="col-sm-12 col-md-8 col-lg-5">
            <FootPrintChart
              crbnScore={this.state.chartDataObj.crbnScore}
              loggedIn={this.props.loggedIn}
              chartData={this.state.chartDataObj}
            />

          </div>
          <UserEvents badges={this.state.badges} />
          <div>

          </div>

          {/* <div className="row">
            <div className="links col-4">
              <a
                href={
                  "https://www.facebook.com/sharer/sharer.php?u=crbnapp.herokuapp.com/test/" +
                  this.state.userData.id
                }
                target="_blank"
              >
                <i className="fab fa-facebook-square fa-3x d-inline" />
              </a>
            </div>
          </div> */}
        </div>
      </div>
    );
  }

  componentWillMount() {
    axios.get("/test").then(res => {
      this.setState({ userData: res.data.data }); // set userData state with info from DB

      this.setUserBadges();

      if (this.props.loggedIn == true) {
        let user = { ...this.state.userData }; // make a copy of user data

        this.setState({
          basicInfoObj: {
            name: user.username,
            city: user.city,
            state: user.state,
            joinedMonth: "May",
            joinedYear: "2018",
            intro: user.intro,
            imgUrl: user.imgUrl,
            createdAt: user.createdAt
          }
        });
        this.calculateScore(user);

      }
    });
  }

  setRegisteredEvents() {
    this.forceUpdate(this.setState(this.state));
  }

  updateChart() {
    console.log("chart update initiated");
    axios
      .get("/test")
      .then(res => {
        return res.data.data;
      })
      .then(userData => this.calculateScore(userData))
      .then(this.forceUpdate());
  }

  setUserBadges() {
    axios.get('/user/events')
    .then(badges => {
        this.setState({badges: badges.data.data})
        console.log(this.state)
    }).then(this.forceUpdate(this.updateChart))
  }

  calculateScore(user) {
    /************************
     * CRBN Score Equation
     *************************/

    /* Set up variables for CRBN score equation */
    let maintenance = user.maintenance;
    let mpg = user.mpg;
    let milesDriven = user.miles_driven;
    let aluminum = user.aluminum;
    let plastic = user.plastic;
    let glass = user.glass;
    let paper = user.paper;
    let householdMembers = user.household_members;

    /*Individual variables that make up the CRBN score */
    let vehiclecO2;
    let wastecO2 = 700; // baseline is 700. reduces based on recycling habits
    let homecO2;
    let eventcO2;

    /* Vehicle cO2 calculations */
    if (maintenance == true) {
      vehiclecO2 = ((milesDriven / mpg) * 19.59) / 2204.62;
    } else {
      vehiclecO2 = (((milesDriven / mpg) * 19.59) / 2204.62) * 1.04;
    }
    console.log("vehicle cO2 is " + vehiclecO2);

    /*Waste cO2 calculations */
    let recyclingScores = {
      aluminum: 90,
      plastic: 35,
      glass: 25,
      paper: 125
    };

    for (var key in recyclingScores) {
      if (user[key] == true) {
        wastecO2 = wastecO2 - recyclingScores[key];
      } else {
        wastecO2 = wastecO2;
      }
    }

    wastecO2 = wastecO2 / 2204.62;

    console.log("waste cO2 is " + wastecO2);

    /* Get the output rate */

    let getOutputRate = zip => {
      let zipsAndRates = grid;
      let theEntry = zipsAndRates.find(entry => {
        return entry.zip == zip;
      });
      return theEntry.output_rate;
    };

    /* Home cO2 calculations */
    let outputRate = getOutputRate(user.zip);
    console.log("the output rate is " + outputRate);
    let natGasBill = user.natgas_bill;
    let electricBill = user.electric_bill;
    let natgascO2 = ((natGasBill / 10.68) * 119.58 * 12) / 2204.62;
    let electriccO2 = ((electricBill / 0.119) * outputRate * 12) / 2204.62;
    homecO2 = (natgascO2 + electriccO2) / householdMembers;

    console.log("home cO2 is " + homecO2);

    function round(num, places) {
      var multiplier = Math.pow(10, places);
      return Math.round(num * multiplier) / multiplier;
    }

    function eventOffsetter(){  
      return axios.get('/user/events')
      .then(res => {
           try{let offsetArray = res.data.data.map((el)=> {return el.offsetscore})
           let offsetSum = offsetArray.reduce((a, b)=>{return a+b})
           return(offsetSum)}
           catch(err){return 0}
          })
    }

    
eventOffsetter().then(res=>{eventcO2 = res;
    /* Final Score */
    let roundedScores = {
      vehicle: round(vehiclecO2, 2),
      waste: round(wastecO2, 2),

      home: round(homecO2, 2),
      event: round(eventcO2, 2),


    };


    let thecrbnScore = round(
      ((roundedScores.vehicle + roundedScores.waste + roundedScores.home - roundedScores.event) *
        100) /
        100,
      2
    );

    let thechartDataObj = {
      crbnScore: thecrbnScore,
      datasets: [
        {
          data: [
            roundedScores.vehicle,
            roundedScores.home,

            roundedScores.waste,
            roundedScores.event,
          ],
          backgroundColor: ['#FF0000', '#666699', '#ffff00', '#08E6C8'],
        },
      ],

      labels: ['Vehicle', 'Home', 'Waste', 'Events'],

    };

    this.setState({ chartDataObj: thechartDataObj });
    axios.post("/user/score", { score: thecrbnScore });

    console.log("The CRBN score is: " + thecrbnScore);
    return thechartDataObj;
    })
  }
}

export default UserProfile;
