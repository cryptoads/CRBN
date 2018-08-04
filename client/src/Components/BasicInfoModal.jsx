import React, {Component} from 'react';


const BasicInfoModal = ({username, intro, imgUrl}) => 
{(
    <div className="modal-overlay closed">
      <div id="basicInfoModal" className="modal closed">
      <div className="modal-content container m-auto">
        <form>
          <label>Profile Picture</label>
          <img className="profile-picture" src={imgUrl} />
          <label>Name</label>
          <input defaultValue={username} type="text" name="name" /> 
          <label>Intro</label>
          <input defaultValue={intro} type="text" name="intro" />
        </form>
        </div>
      </div>
    </div>
)}


