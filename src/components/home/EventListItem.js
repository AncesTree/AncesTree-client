import React, {Component} from 'react';
import {ListGroup, Button} from 'react-bootstrap';

import EventListItem from './EventList' 
import ApiService from '../../services/Neo4jAPIService'
export default class EventListItem extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <ListGroup>
                <ListGroup.Item>{this.props.title}</ListGroup.Item>
                <ListGroup.Item>{this.props.content}</ListGroup.Item>
                <ListGroup.Item>{this.props.date}</ListGroup.Item>
                <ListGroup.Item>{this.props.link}</ListGroup.Item>
                <ListGroup.Item>{this.props.autor.firstname}</ListGroup.Item>  
            </ListGroup>
        );
    }
}

