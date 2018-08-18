import React, { Component } from 'react';
import axios from 'axios';

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userData: this.props.userData
    };
  }

  render() {
    let { events } = this.state;
    console.log(events);
    return (
      <React.Fragment>
        <div className="events col-12 text-center">
          <h3>Upcoming Events</h3>
          <ul className="events-ul m-auto">
            {events.map(event => {
              return (
                <li>
                {event.eventname}
                <br />
                <button id={event.id} onClick={this.registerForEvent.bind(this)} className='appBtn'>Register</button>
                </li>
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }

  componentWillMount() {
    axios.get('/eventfeed')
      .then(eventData => {
        this.setState({ events: eventData.data.data })
      })
      .catch(err => console.error(err));
  }

convertDate() { (dateString) => new Date(dateString)};

registerForEvent(e) {
  e.preventDefault();
  console.log(e.target.id)
  let eventId = e.target.id;
  let userId =  this.props.id;  
  axios.post(`/events/${eventId}/attendees`, {
    userId: userId
  })
}

}

export default EventsList;
