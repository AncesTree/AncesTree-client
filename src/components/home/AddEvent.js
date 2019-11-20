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
            <Form>
  <Form.Group controlId="titre">
    <Form.Label>Titre</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Exprimez vous!</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>



);
}
}