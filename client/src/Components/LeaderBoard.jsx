import React, {Component} from 'react';
import axios from 'axios';
import AppHeader from "./AppHeader"
import AppFooter from "./AppFooter"
import LdrBrdImg from "../LdrBrdImg.js";

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
        const imgStyle = {height: '100px'};
        const textStyle = {color: 'black'};
        const sorted = this.state.res.data.sort((a,b)=>{return a.score-b.score})
        const cards = sorted.map((el, i)=>{return <tr key={i}>
                                                <th scope="row">{i+1}</th>
                                                <td><img src={el.imgUrl} alt={el.username} style={imgStyle} />{el.username}</td> 
                                                <td>{el.score}</td> </tr>})
        return(


            <div >
            <AppHeader />
            <table className="table table-hover" style={textStyle} >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">CRBN Score</th>
                </tr>
              </thead>
              <tbody>
                {cards}
              </tbody>
            </table>
            <AppFooter />
            </div>
            )
    }
}

export default LeaderBoard;