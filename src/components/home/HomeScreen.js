import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import EventList from './EventListItem'
import AddEvent from './AddEvent'
import ApiService from '../../services/Neo4jAPIService'
export default class HomeScreen extends Component {

    render() {
        return (
            <div className="homeBackground">
              <AddEvent></AddEvent>
              <EventList></EventList>
            </div>
        );
    }
}