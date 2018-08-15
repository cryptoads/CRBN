import React, {Component} from 'react';
let {loggedIn} = this.props; 

const Header = (props) =>
(
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">CRBN</h1>
        { loggedIn ? <button className="appBtn" onClick={this.props.logout}>Log Out</button> : "" }
      </header>
    </div>
)

export default Header; 