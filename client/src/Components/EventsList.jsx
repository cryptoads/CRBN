import React, { Component } from 'react';
import axios from 'axios';

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userData: this.props.userData,
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
    axios.get('/eventfeed')
      .then(eventData => {
        this.setState({ events: eventData.data.data })
      })
      .catch(err => console.error(err));
  }

convertDate() { (dateString) => new Date(dateString)};

}

export default EventsList;
