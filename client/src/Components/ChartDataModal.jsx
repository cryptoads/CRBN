import React, { Component } from 'react';
import axios from 'axios';

class ChartDataModal extends Component {
    render() {
        let modalJSX = (
        <div className="perspective-container">
            <div id="modal-overlay" className="modal-overlay closed"></div>
                <div id="modal" className="modal closed">
                <span className="closeLink" onClick={this.closeModal.bind(this)}>X</span>
                <div className="modal-content">
                    <form className="updateProfileForm">
                        <h4>Vehicle</h4>
                        <p>
                            <label>Miles Per Gallon: </label>
                            <input type="text" name="mpg"/>
                        </p>
                        <p>
                            <label>Miles Driven Annually: </label>
                            <input type="text" name="milesDriven" />
                        </p>
                        <p>
                            <label>Regular Maintenance? </label>
                            <br />
                            <label>Yes</label>
                            <input type="radio" value="Yes" id="yes" name="maintenance" />
                            <label>No</label>
                            <input type="radio" value="No" id="no" name="maintenance" />
                        </p>
                        <h4>Home</h4>
                        <p>
                            <label>Zip Code: </label>
                            <input type="text" name="zip" />
                        </p>
                        <p>
                            <label>Gas Bill (monthly): </label>
                            <input type="text" name="gasBill" />
                        </p>
                        <p>
                            <label>Electric Bill: </label>
                            <input type="text" name="electricBill" />
                        </p>
                        <h4>Waste</h4>
                        <p>
                            <label>Recycling Habits</label>
                            <br />
                            <label>Paper</label>
                            <input type="checkbox" id="paper" value="paper" name="recycling" />
                            <label>Plastic</label>
                            <input type="checkbox" id="plastic" value="plastic" name="recycling" />
                            <br />
                            <label>Glass</label>
                            <input type="checkbox" id="glass" value="glass" name="recycling" />
                            <label>Aluminum</label>
                            <input type="checkbox" id="aluminum" value="aluminum" name="recycling" />
                        </p>
                        <input type="submit" onClick={this.updateUser.bind(this)} value="Update" />
                    </form>
                </div>
            </div>
    </div>);
        return (
            modalJSX
        );
        }
    closeModal() {
        let theModal = document.querySelector('#modal');
        let modalOverlay = document.querySelector('#modal-overlay');
        theModal.classList.toggle("closed");
        modalOverlay.classList.toggle("closed");
    }
    updateUser(e) {
        e.preventDefault();
        let userData = {
            mpg: document.getElementsByName('mpg')[0].value,
            milesDriven: document.getElementsByName('milesDriven')[0].value,
            maintenance: document.querySelector('input[name=maintenance][checked]'),
            zip: document.getElementsByName('zip')[0].value,
            gasBill: document.getElementsByName('gasBill')[0].value,
            electricBill: document.getElementsByName('electricBill')[0].value,
            recycling: document.querySelector('input[name=recycling][checked]')
        }
        console.log(userData); 
        axios({
            url: '/',
            method: 'post',
            data: { formData: userData }
        })
    }
}

export default ChartDataModal;