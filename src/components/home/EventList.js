import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import EventListItem from './EventListItem'

export default class EventList extends Component {


    render() {
        return (
            <ListGroup variant="flush">
                {    
                   this.props.events.map((event,i) =>
                        <ListGroup.Item key={i}>
                            <EventListItem
                                key={i}
                                title={event.event.title}
                                content={event.event.content}
                                date={event.event.date}
                                link={event.event.link}
                                autor={event.autor}
                            /></ListGroup.Item>

                    )
                }
            </ListGroup>
        )
    }
}
