import React, { Component } from 'react';
import axios from 'axios';

class ChartDataModal extends Component {
    constructor(props) {
        super(props);

        axios.get('/test').then( res => {return res.data.data} ).then( data => this.setState({user: data }));

        this.state = {
            chartData: this.props.chartData,
            user: {},
            hasErrors: false,
            errorMsg: ""
        }
    }

    render() {
        
        let {zip, natgas_bill, electric_bill, mpg, miles_driven, household_members} = this.state.user;

        let modalJSX = (
        <div className="perspective-container">
            <div id="modal-overlay" className="modal-overlay closed"></div>
                <div id="modal" className="modal closed">
                <span className="closeLink" onClick={this.closeModal.bind(this)}>X</span>
                <div className="modal-content container m-auto">
                    <div role="alert" className={this.state.errorMsg.length <= 0 ? "alert alert-danger" : "alert alert-danger show"}>{this.state.errorMsg}</div>
                    <form className="updateProfileForm">
                        <h4>Vehicle</h4>
                        <p>
                            <label>Miles Per Gallon: </label>
                            <input defaultValue={mpg} type="text" name="mpg"/>
                        </p>
                        <p>
                            <label>Miles Driven Annually: </label>
                            <input defaultValue={miles_driven} type="text" name="milesDriven" />
                        </p>
                        <p>
                            <label>Regular Maintenance? </label>
                            <br />
                            <label>Yes</label>
                            <input type="radio" value="Yes" id="yes" name="maintenance" 
                            />
                            <label>No</label>
                            <input type="radio" value="No" id="no" name="maintenance" />
                        </p>
                        <h4>Home</h4>
                        <p>
                            <label>Zip Code: </label>
                            <input defaultValue={zip} type="text" name="zip" />
                        </p>
                        <p>
                            <label>Gas Bill (monthly): </label>
                            <input defaultValue={natgas_bill} type="text" name="gasBill" />
                        </p>
                        <p>
                            <label>Electric Bill: </label>
                            <input defaultValue={electric_bill} type="text" name="electricBill" />
                        </p>
                        <p>
                            <label>Size of Household: </label>
                            <input defaultValue={household_members} type="text" name="householdSize" />
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
                        <button className="appBtn" type="submit" onClick={this.updateUser.bind(this)}>Update</button>
                    </form>
                </div>
            </div>
    </div>);
        return (
            modalJSX
        );
    }

    componentDidMount() {
        let checkboxSelections = [ "aluminum", "glass", "paper", "plastic" ];

        axios.get('/test').then( res => {return res.data.data})
        .then( user => {
            checkboxSelections.forEach( box => {
                let input = document.querySelector(`[value=${box}]`);
                if (user[box] == true) { input.checked = true }      
        })
        return user.maintenance;
        })
        .then( maintenance => {
            let input = document.querySelector(`[name=maintenance]`); 
            maintenance ? input.checked = true : input.checked = false;
        }); 

    }

     validateForm() {
        /* Validate Form Data */ 
        let userData = {
           mpg: document.getElementsByName('mpg')[0].value,
           milesDriven: document.getElementsByName('milesDriven')[0].value,
           zip: document.getElementsByName('zip')[0].value,
           gasBill: document.getElementsByName('gasBill')[0].value,
           electricBill: document.getElementsByName('electricBill')[0].value,
           householdSize: document.getElementsByName('householdSize')[0].value,
       }

       let checkArray = []; 

        Object.keys(userData).forEach( item => {
            if (userData[item].length < 1 || userData[item] == "") {
               document.getElementsByName(item)[0].classList.add('errorInput');
               checkArray.push(false);
           } else { checkArray.push(true) }
       })
       console.log(checkArray);
       if (checkArray.includes(false)) { 
           this.setState({ errorMsg: `Please check your entry and try again` });
           this.setState({ hasErrors: true});
        }
       else if(!(checkArray.includes(false))) {
        this.setState({ errorMsg: "" }); 
        this.setState({ hasErrors: false }); 
        }
    } 
    
    componentWillUnmount() {
        this.props.updateChart();
    }

    closeModal() {
        let theModal = document.querySelector('#modal');
        let modalOverlay = document.querySelector('#modal-overlay');
        theModal.classList.toggle("closed");
        modalOverlay.classList.toggle("closed");
    }
    updateUser(e) {
         e.preventDefault();
        
         this.validateForm(); 

        /* Get radio button selection */
        let radioSelection; 
        let regMaintenance;
        let radioBtns = document.getElementsByName('maintenance'); 
        for (let i = 0; i < radioBtns.length; i++) {
            if (radioBtns[i].checked) {
                console.log(radioBtns[i].value);
                radioSelection = radioBtns[i].value;
                break;
            }
        }
        if (radioSelection == "Yes") {
            regMaintenance = true;
        } else { regMaintenance = false }        

        /* Get checkbox selections */
        let checkboxes = document.getElementsByName('recycling');
        let recyclingSelections = [];
        for (let i=0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                console.log(checkboxes[i].value);
                recyclingSelections.push(checkboxes[i].value);
            }
        }

        let userData = {
            mpg: document.getElementsByName('mpg')[0].value,
            milesDriven: document.getElementsByName('milesDriven')[0].value,
            maintenance: regMaintenance,
            zip: document.getElementsByName('zip')[0].value,
            gasBill: document.getElementsByName('gasBill')[0].value,
            electricBill: document.getElementsByName('electricBill')[0].value,
            householdSize: document.getElementsByName('householdSize')[0].value,
            recycling: recyclingSelections
        }
        
        if (!(this.state.hasErrors)) {
            axios({
                url: '/updateInfo',
                method: 'post',
                data: { formData: userData }
            })
            this.closeModal();
            this.props.updateChart();
            }
    }
}

export default ChartDataModal;