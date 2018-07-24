import React, { Component } from 'react';

class EditModal extends Component {
    render() {
        return (
            <div>
                <div id="modal-overlay" className="modal-overlay"></div>
                <div id="modal" className="modal">
                    <span className="closeLink" onClick={this.closeModal.bind(this)}>X</span>
                    <div className="modal-content">
                        <form>
                            <h4>Vehicle</h4>
                            <p>
                                <label>Miles Per Gallon: </label>
                                <input type="text" />
                            </p>
                            <p>
                                <label>Miles Driven Annually: </label>
                                <input type="text" />
                            </p>
                            <p>
                                <label>Regular Maintenance?</label>
                                <label>Yes</label>
                                <input type="radio" id="yes" name="maintenance" />
                                <label>No</label>
                                <input type="radio" id="no" name="maintenance" />
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
        }
    closeModal() {
        let theModal = document.querySelector('#modal');
        let modalOverlay = document.querySelector('#modal-overlay');
        theModal.classList.toggle("closed");
        modalOverlay.classList.toggle("closed");
    }
}

export default EditModal;