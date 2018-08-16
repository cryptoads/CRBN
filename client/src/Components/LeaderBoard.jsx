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
        const cards = sorted.map((el, i)=>{return <tr><th key={i} scope="row">{i+1}</th>
                                                  <td><img src={el.imgUrl} /></td>
                                                  <td>{el.username}</td> 
                                                  <td>{el.score}</td> </tr>})
        return(
            <div className="container">
            
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"></th>
                  <th scope="col">User</th>
                  <th scope="col">CRBN Score</th>
                </tr>
              </thead>
              <tbody>
                {cards}
              </tbody>
            </table>
            
            </div>
            )
    }
}

export default LeaderBoard;