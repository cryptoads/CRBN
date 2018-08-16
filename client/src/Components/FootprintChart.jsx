import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class FootprintChart extends Component {

  constructor(props) {
    super(props); 
  }

  render() {
    let loginState = this.props.loggedIn;
    let data = this.props.chartData;
    let userCRBNScore = this.props.crbnScore;
    let willLoadChart = this.props.showChart;

    let chartJSX = (
    <div className='profile-info chart-container col-sm-12 col-md-8 col-lg-8 ml-auto mr-auto'>
      <h2>Footprint</h2>
        <span onClick={this.editLinkClick.bind(this)} className="edit-info-link">{ loginState !== false ? 'Edit Footprint Info' : '' }</span>
        <hr />
        <h3>CRBN Score: {userCRBNScore}</h3> <Doughnut data={data} />
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

