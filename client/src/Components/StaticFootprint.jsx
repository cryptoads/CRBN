import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class FootprintChart extends Component {


  render() {
    let data = this.props.chartData;
    let userCRBNScore = this.props.crbnScore;

    let chartJSX = (
    <div className='profile-info chart-container col-sm-12 col-md-8 col-lg-8'>
      <h2>Footprint</h2>
        
        <hr />
        <h3>CRBN Score: {userCRBNScore}</h3> <Doughnut data={data} />
    </div>)
    return (
      chartJSX
    )
  }

}


export default FootprintChart;
