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
        const eventItem = this.props.badges.map((el, i)=>{return <div><h1>{el.eventname}</h1>
            <div>
            <img src={el.badgeimg} style={imgStyle} key={i} />
            </div>
            </div>})

        return(
            <div className="trophyCase col-4" >
            {eventItem}
            </div>)
    }
}

export default UserEvents;