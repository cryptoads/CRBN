import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class FootprintChart extends Component {

  render() {
    let isLoggedIn = this.props.isLoggedIn;
    let data = {
      datasets: [{
          data: [10, 20, 30],
          backgroundColor : [
            '#08E6C8','#472029', '#a7ed9c' 
          ],
      }],
  
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
          'Vehicle',
          'Home',
          'Waste'
      ]
  };

    let chartJSX = (
    <div className='profile-info chart-container col-8'>
      <h2>Footprint</h2>
        <span onClick={this.editLinkClick.bind(this)} className="edit-info-link">Edit Footprint Info</span>
        <Doughnut data={data} />
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

