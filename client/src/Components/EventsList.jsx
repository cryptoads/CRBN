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
        <div className="events container col-12 text-center">
          <h2>Upcoming Events</h2>
          <ul className="events-ul">
            {events.map(event => {
              return (
                <li>
                {event.name.text} <a target="blank" href={event.url}><br /><button className='appBtn'>Register</button></a>
                </li>
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }

  componentWillMount() {
    axios.get('http://localhost:3001/events')
      .then(eventData => {
        console.log(eventData)
        this.setState({ events: eventData.data })
      })
      .catch(err => console.error(err));
  }

convertDate() { (dateString) => new Date(dateString)};

}

export default EventsList;
