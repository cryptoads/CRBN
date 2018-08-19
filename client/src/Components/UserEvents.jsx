import React, { Component } from 'react';
import axios from 'axios';

class UserEvents extends Component{
    constructor(props){
        super(props)
        this.state = {badges: this.props.badges}
    }

    componentWillMount(){
        axios.get('/user/events')
        .then(badges => {
            this.setState({badges: badges.data.data})
            console.log(this.state)
        })
    }

    render(props){
        const imgStyle = {height: '100px'};
        const eventItem = this.props.badges.map((el, i)=>{return <div><h5>{el.eventname}</h5>
            <div>
            <img className="badges" src={el.badgeimg} style={imgStyle} key={i} />
            </div>
            </div>})

        return(
            <div className="trophyCase col-3" >
            <h3>Event Badges</h3>
            <hr />
            {eventItem}
            </div>)
    }
}

export default UserEvents;