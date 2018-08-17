
import React, { Component } from 'react';
import axios from 'axios';



class BasicInfo extends Component {

  constructor(props) {
    super(props);
    this.state = { id: this.props.id }
  }

  render(props) {
    let basicInfo = this.props.basicInfo;
    let loggedIn = this.props.loggedIn;
    return (
    <div className="basic-info-container col-12">
      <img alt="profile-pic" className='profile-picture' src={basicInfo.imgUrl} />
      
      <div className="profile-info basic-info-text">
      <span onClick={this.editButtonClicked} className='edit-info-link'> {loggedIn !== false ? 'Edit Basic Info' : ''}</span>
      <button onClick={this.saveButtonClicked} className="saveButton appBtn hide">Save</button>
      <p className="username">
        {basicInfo.name}
      </p>
        <span>
          Intro:
        </span>
        <br />
        <p className="intro">{basicInfo.intro}</p>
        <hr />
        <small>Member since {basicInfo.joinedMonth}, {basicInfo.joinedYear}</small>
      </div>
    </div>
    )
  }

  editButtonClicked(e) {
    let btnText = e.target.innerHTML;
    let usernameElement = document.querySelector('.username');
    let introElement = document.querySelector('.intro');
    let elementArray = [usernameElement, introElement]
    let editBtn = document.querySelector('.edit-info-link');

    /* Toggle to save button */
    let saveBtn = document.querySelector('.saveButton');

    editBtn.classList.toggle('hide');
    saveBtn.classList.toggle('hide');

    /* Make elements editable */
    elementArray.forEach(e => {
      e.setAttribute('contenteditable', 'true');
      e.classList.toggle('editable');
    })
  }

  saveButtonClicked(e) {
    let nameToSave = document.querySelector('.username').innerHTML;
    let introToSave = document.querySelector('.intro').innerHTML;
    let usernameElement = document.querySelector('.username');
    let introElement = document.querySelector('.intro');
    let elementArray = [usernameElement, introElement]


    e.preventDefault();

    let btn = document.querySelector('.saveButton')

    let saveData = {
      name: nameToSave,
      intro: introToSave,
      id: 2
    }

    console.log(saveData);

    axios({
      url: '/updatebasicinfo',
      method: 'post',
      data: saveData
    })
    .then( res => console.log('the response was: ' + JSON.stringify(res.data)))
    .catch(err => console.error(err)); 

    btn.classList.toggle('hide');

    elementArray.forEach(e => {
      e.setAttribute('contenteditable', 'false');
      e.classList.toggle('editable');
    })

    document.querySelector('.edit-info-link').classList.remove('hide');

  }





}


export default BasicInfo;

