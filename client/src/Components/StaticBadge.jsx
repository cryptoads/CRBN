import React, { Component } from 'react';
import axios from 'axios';

class UserEvents extends Component{
    constructor(props){
        super(props)
        this.state = {badges: this.props.badges}
    }

    componentWillMount(){
        axios.get('/userstatic/events/', {
            params: {
                user: this.props.userId
            }
        })
        .then(badges => {

            this.setState({badges: badges.data.data})
            console.log('this')
            console.log(this.state)
        })
    }

    render(props){
        console.log(this.props.userId)
        const imgStyle = {height: '75px'};
        const eventItem = this.state.badges.map((el, i)=>{return <div className="col-3">
            <img src={el.badgeimg} style={imgStyle} key={i} alt={el.eventname} title={el.eventname} className="inline-block mb-3" />
            </div>})

        return(
            <div className="container">
            <div className="trophyCase row" >   
            <h3 className="col-12">Event Badges</h3>
            {eventItem}
            </div>
            </div>)
    }
}

export default UserEvents;