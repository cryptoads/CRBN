import React, { Component } from 'react';

class ChartDataModal extends Component {
    render() {
        let modalJSX = (
        <div className="perspective-container">
            <div id="modal-overlay" className="modal-overlay closed"></div>
                <div id="modal" className="modal closed">
                <span className="closeLink" onClick={this.closeModal.bind(this)}>X</span>
                <div className="modal-content">
                    <form>
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
                            <input type="radio" id="yes" name="maintenance" />
                            <label>No</label>
                            <input type="radio" id="no" name="maintenance" />
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
                            <input type="checkbox" id="paper" name="recycling" />
                            <label>Plastic</label>
                            <input type="checkbox" id="plastic" name="recycling" />
                            <br />
                            <label>Glass</label>
                            <input type="checkbox" id="glass" name="recycling" />
                            <label>Aluminum</label>
                            <input type="checkbox" id="aluminum" name="recycling" />
                        </p>
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
}

export default ChartDataModal;