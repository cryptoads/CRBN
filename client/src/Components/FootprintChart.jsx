import React, { Component } from 'react';


class FootprintChart extends Component {

  render() {
    let isLoggedIn = this.props.isLoggedIn; 
    let chartJSX = (
    <div className='profile-info chart-container col-8'>
      <h2>Footprint</h2>
        <span onClick={this.editLinkClick.bind(this)} className="edit-footprint-info">Edit Footprint Info</span>
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

