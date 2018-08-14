import React, {Component} from 'react';

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {title: 'Trees Atlanta Beltline Planting', date: '10/26/2018'},
        {title: 'Trees Atlanta Volunteer Event', date: '8/25/2018'},
        {title: 'Beltline Beautification Day', date: '8/15/2018'},
      ],
      userData: this.props.userData,
    };
  }

  render() {
    let {events} = this.state;
    return (
      <div className="events-container col-8">
        <h2>Events</h2>
        <ul className="events-ul">
          {events.map(event => {
            return (
              <li>
                {event.title} - {event.date}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default EventsList;
