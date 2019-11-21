import React, {Component} from 'react';
import EventList from './EventList'
import AddEvent from './AddEvent'

export default class HomeScreen extends Component {

    render() {
        return (
            <div>
              <AddEvent />
              <h1>Liste des Evènements</h1>
              <EventList/>
            </div>
        );
    }
}