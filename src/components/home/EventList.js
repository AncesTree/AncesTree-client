import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import ApiService from '../../services/Neo4jAPIService'
import EventListItem from './EventListItem'

export default class EventList extends Component {

    constructor() {
        super()

        this.state = {
            events: undefined,
            isFetching: true
        }
    }

    componentDidMount() {
 
        ApiService.getEvents()
            .then(events => {
                this.setState({
                    events: events,
                    isFetching: false
                })
            })
            .catch(err => {
                this.setState({
                    isFetching: false
                })
                console.log(err)
            })
    };


    render() {
        return (
            <ListGroup variant="flush">
                {console.log(this.state.events)}
                {    
                    this.state.isFetching ? (
                        <p> Récupération des évènements...</p>
                    ) : this.state.events === undefined ?(
                        <p> Aucun évènement trouvé... </p>
                    ): this.state.events.map((event,i) =>
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
