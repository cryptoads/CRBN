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
        })
    }

    render(){
        const imgStyle = {height: '100px'};
        const eventItem = this.state.res.map((el, i)=>{return <div><h1>{el.eventname}</h1>
            <div>
            <img src="https://www.4roffice.co.uk/storefront/images/dealers/CO2%20left%20footprint.png" style={imgStyle} key={i} />
            </div>
            </div>})

        return(
            <div>
            {eventItem}
            </div>)
    }
}

export default UserEvents;