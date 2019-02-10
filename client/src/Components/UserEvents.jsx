import React, { Component } from 'react';
import axios from 'axios';
import "../App.css";

class UserEvents extends Component{
    constructor(props){
        super(props)
        this.state = {badges: this.props.badges}
    }

    componentWillMount(){
        axios.get('/user/events')
        .then(badges => {
            this.setState({badges: badges.data.data})
        })
    }

    render(props){

        const imgStyle = {height: '75px', width: '60px'};
        const eventItem = this.props.badges.map((el, i)=>{return <div key={i} className="col-3">
            <img src={el.badgeimg} style={imgStyle} alt={el.eventname} title={el.eventname} className="badges inline-block mb-3" />
            </div>})

        return(
            <div className="container">
            <div className="trophyCase row" >   
            <h3 className="col-12">Event Badges</h3>
            {this.props.badges.length >= 1 ? eventItem : <small>You haven't earned any badges yet. Check your <b>Upcoming Events</b> feed for opportunities to offset your footprint and earn badges with your community!</small> }
            </div>
            </div>)
    }
}

export default UserEvents;