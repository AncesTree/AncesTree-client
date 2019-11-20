import React, {Component} from 'react';
import {ListGroup} from 'react-bootstrap';
import ApiService from '../../services/Neo4jAPIService'
export default class EventList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: undefined,
            isFetching: true
        };
    }
    
    componentDidMount = () => {
        const events = ApiService.getEvents()
        this.setState({
            events: events,
            isFetching: false
        })
    };


    render() {
        return (
            <div className="eventListWrapper">
               <ListGroup variant="flush"> 
              {
                  this.state.isFetching ? (
                      <p> Récupération des évènements...</p>
                  ): this.state.events.map((event) =>
                  <ListGroup.Item><EventListItem
                    id = {event.id}
                    title = {event.title}
                    content = {event.content}
                    date = {event.date}
                    link = {event.link}
                    autor = {event.autor}
                  /></ListGroup.Item>
                  )
              }
              </ListGroup>
            </div>
