import React, {Component} from 'react';
import axios from 'axios';

class LeaderBoard extends Component{
    constructor(){
        super()
        this.state ={res:{
            data:[]
        }}
    }

    componentWillMount(){
        axios.get('/all/scores').then(res => {
            this.setState({'res':res.data})
        })

    }

    render(){
        const sorted = this.state.res.data.sort((a,b)=>{return a.score-b.score})
        const cards = sorted.map((el, i)=>{return <h1 key={i}>{i+1}<img src={el.imgUrl} />{el.username}, {el.score}</h1>})
        return(
            <div>
            
            {cards}
            
            </div>
            )
    }
}

export default LeaderBoard;