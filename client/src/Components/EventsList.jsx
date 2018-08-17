import React, { Component } from 'react';
import axios from 'axios';

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [{name: {text: 'test'}, start: { local: '2018-09-21T19:00:00' }}],
      userData: this.props.userData,
    };
  }

  render() {
    let { events } = this.state;
    return (
      <React.Fragment>
        <div className="events col-sm-12 col-md-3 col-lg-3">
          <h2>Upcoming Events</h2>
          <ul className="events-ul">
            {events.map(event => {
              return (
                <li>
                {event.eventname} <a target="blank" href={'localhost:3000/events/'+event.id}><br /><button className='appBtn'>Register</button></a>
                </li>
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }

  componentWillMount() {
    axios.get('http/localhost:3000/eventfeed')
      .then(eventData => {
        console.log(eventData)
        this.setState({ events: eventData.data })
      })
      .catch(err => console.error(err));
  }

convertDate() { (dateString) => new Date(dateString)};

}

export default EventsList;
