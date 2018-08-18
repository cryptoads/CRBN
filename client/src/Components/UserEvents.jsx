import React, { Component } from 'react';
import axios from 'axios';

class UserEvents extends Component{
    constructor(){
        super()
        this.state = {res:[]}

    }

    componentWillMount(){
        axios.get('/user/events')
        .then(res => {
            this.setState({res: res.data.data})
            console.log(this.state)
        })
    }

    render(){
        const imgStyle = {height: '100px'};
        const eventItem = this.state.res.map((el, i)=>{return <div><h1>{el.eventname}</h1>
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