import React, {Component} from 'react';
import EventList from './EventList'
import AddEvent from './AddEvent'
import ApiService from '../../services/Neo4jAPIService'


export default class HomeScreen extends Component {

    constructor(){
        super()

        this.state = {
            events: undefined,
            isFetching: true
        }
    }

    async eventAdded(){
        ApiService.getEvents()
        
        .then(events => {
            this.setState({
                events: events
            })
        })
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
            <div className="justify-content-md-center container">
              <AddEvent eventAdded = {this.eventAdded.bind(this)}/>
              <h1>Liste des Evènements</h1>
              {this.state.isFetching ? (
                        <p> Récupération des évènements...</p>
                    ) : this.state.events === undefined ?(
                        <p> Aucun évènement trouvé... </p>
                    ): <EventList events = {this.state.events} />}
            </div>
        );
    }
}