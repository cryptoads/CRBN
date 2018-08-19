import React, { Component } from 'react';
import axios from 'axios';

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userData: this.props.userData,
      registeredEvents: []
    };
    this.setUserBadges = this.props.setUserBadges;
  }

  render() {
    let { events } = this.state;
    let { registeredEvents } = this.state;

    let registeredEventIds = registeredEvents.map(event => Number(event.id));


    // console.log('the registered events: ' + registeredEventIds)
    return (
      <React.Fragment>
        <div className="events col-12 text-center">
          <h3>Upcoming Events</h3>
          <hr />
          <ul className="events-ul m-auto">
            {events.map((event, i) => {
              return (
                <li key={i}>
                  {event.eventname}
                  <br />
                  {(!(registeredEventIds.includes(event.id))) ? 
                  <button id={event.id} onClick={this.registerForEvent.bind(this)} className='appBtn'>Register</button> : 
                  <button id={event.id} onClick={this.registerForEvent.bind(this)} className='appBtn going'>Going</button>}
                </li>
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }

  componentWillMount() {
    this.getRegisteredEvents();
    axios.get('/eventfeed')
      .then(eventData => {
        this.setState({ events: eventData.data.data })
      })
      .catch(err => console.error(err));
  }

  // convertDate(){ 
  //   (dateString)=>{new Date(dateString) }
  // };

  getRegisteredEvents() {
    /* Get registered events */
    axios.get('/user/events')
      .then(events => this.setState({ registeredEvents: events.data.data }))
      .catch(err => console.error(err))
  }

  registerForEvent(e) {
    e.preventDefault();
    // console.log(e.target.id)
    let eventId = e.target.id;
    let userId = this.props.id;
    let registerBtn = document.getElementById(eventId)
    


    axios.post(`/events/${eventId}/attendees`, {
      userId: userId
    })
      .then(this.setUserBadges)
        /* change button styles and content */
        registerBtn.classList.add('going');
        registerBtn.textContent = 'Going';


  }
}

export default EventsList;
