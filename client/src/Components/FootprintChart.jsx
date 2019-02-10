import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import "../UserProfile.css";

class FootprintChart extends Component {

  render() {
    let loginState = this.props.loggedIn;
    let data = this.props.chartData;
    let userCRBNScore = this.props.crbnScore;
    let pulserClass = "edit-info-link";
    if(isNaN(userCRBNScore)){
      userCRBNScore = "Set up your info";
      pulserClass = "edit-info-link pulsate"

    }
    let rankInfo = this.props.rankInfo;

    let chartJSX = (
    <div className='profile-info chart-container col-sm-12 col-md-8 col-lg-8 ml-auto mr-auto'>
      <h2>Carbon Emission Footprint</h2>
        <span onClick={this.editLinkClick.bind(this)} className={pulserClass}>{ loginState !== false ? 'Edit Footprint Info' : '' }</span>
        <hr />
        <h3>CRBN Score: {userCRBNScore}*  |  Rank: {rankInfo.rank} / {rankInfo.total}</h3> <Doughnut data={data} />
        <br />
        <h6>*metric tons per year</h6>
        <hr />
          <p>Share:</p>
              <a href={"https://www.facebook.com/sharer/sharer.php?u=crbnapp.herokuapp.com/userprofile/" + this.props.userData.id} target="_blank"> 
              <i className="fb fab fa-facebook-square fa-3x d-inline" /></a>
              <a href={"https://twitter.com/home?status=Check%20out%20my%20CRBN%20score!%0Ahttps%3A//crbnapp.herokuapp.com/userprofile/" + this.props.userData.id} target="_blank"> 
              <i className="twtr fab fa-twitter-square fa-3x d-inline" /></a>
              <a href={"https://plus.google.com/share?url=https%3A//crbnapp.herokuapp.com/userprofile/" + this.props.userData.id} target="_blank"> 
              <i className="googl fab fa-google-plus-square fa-3x d-inline" /></a>
    </div>)
    return (
      chartJSX
    )
  }



  editLinkClick() {
    let modal = document.querySelector('#modal');
    let modalOverlay = document.querySelector('#modal-overlay');

    modal.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');
  }
}


export default FootprintChart;

