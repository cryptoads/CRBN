import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import "../UserProfile.css";
import axios from "axios";

class FootprintChart extends Component {

  constructor(props) {
    super(props); 

  }

  render() {
    let loginState = this.props.loggedIn;
    let data = this.props.chartData;
    let userCRBNScore = this.props.crbnScore;
    if(isNaN(userCRBNScore)){
      userCRBNScore = "Set up your info"
    }
    let willLoadChart = this.props.showChart;
    let rankInfo = this.props.rankInfo;

    let chartJSX = (
    <div className='profile-info chart-container col-sm-12 col-md-8 col-lg-8 ml-auto mr-auto'>
      <h2>Carbon Emission Footprint</h2>
        <span onClick={this.editLinkClick.bind(this)} className="edit-info-link">{ loginState !== false ? 'Edit Footprint Info' : '' }</span>
        <hr />
        <h3>CRBN Score: {userCRBNScore}*  |  Rank: {rankInfo.rank} / {rankInfo.total}</h3> <Doughnut data={data} />
        <br />
        <h6>*metric tons per year</h6>
        <hr />
          <p>Share:</p>
              <i className="fb fab fa-facebook-square fa-3x d-inline" />
              <i className="twtr fab fa-twitter-square fa-3x d-inline" />
              <i className="googl fab fa-google-plus-square fa-3x d-inline" />
    </div>)
    return (
      chartJSX
    )
  }

  componentWillMount(){

  }

  editLinkClick() {
    let modal = document.querySelector('#modal');
    let modalOverlay = document.querySelector('#modal-overlay');

    modal.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');
  }
}


export default FootprintChart;

