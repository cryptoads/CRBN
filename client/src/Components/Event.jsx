import React, { Component } from 'react';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Trees Atlanta Volunteer Day',
            img: 'https://www.guidestar.org/ViewEdoc.aspx?eDocId=4165820&approved=True',
            description: 'We gonna plant trees.',
            eventbriteId: 'f53wE321'
        };
    }

    render() {
        let { title, img, description, eventbriteId } = this.state;
        return (
            <div className="event-page container">
                <div className="row">
                <div className="col-12 text-center event-info-container">
                <img className="event-image" src={img} />
                <h2>{title}</h2>
                <p>{description}</p>
                </div>
                </div>
            </div>
        );
    }
}

export default Event;
