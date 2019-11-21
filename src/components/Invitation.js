import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {INVITATION_URL} from '../conf/config'
import history from './common/history'

export default class Invitation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            phone : '',
            firstname: '',
            lastname: '',
            birthdate: '',
            promotion: '',
            mentor: ''
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };
    onSubmit = (event) => {
        event.preventDefault();
        fetch(INVITATION_URL.url, {
            headers: INVITATION_URL.header,
            method: INVITATION_URL.method,
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                
                
            })
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("Authorization", res.token);
                history.push("/");
                return res
            }).catch((error) => {

        });

    };

    render() {
        return (
            <div className="invitationBackground">
                <Form className="loginForm" onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">

                    <Row>
                        <Col>
                            <Form.Control placeholder="Nom" value={this.state.lastname} onChange={this.handleInputChange} required />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Prénom" value={this.state.firstname} onChange={this.handleInputChange} required />
                        </Col>
                    </Row>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email"  name="email" placeholder="Adresse mail" value={this.state.email} onChange={this.handleInputChange} required />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Promotion</Form.Label>
                        <Form.Control as="select" value={this.state.promotion} onChange={this.handleInputChange} required >
                            <option>2022</option>
                            <option>2021</option>
                            <option>2020</option>
                            <option>2019</option>
                            <option>2018</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text"  name="email" placeholder="Parain" value={this.state.mentor} onChange={this.handleInputChange} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text"  name="email" placeholder="Numéro de téléphone" value={this.state.phone} onChange={this.handleInputChange} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="date"  name="email" placeholder="Date de naissance" value={this.state.email} onChange={this.handleInputChange} required />
                    </Form.Group>

                    <Button className="loginButton" variant="primary" type="submit">
                        Valider
                    </Button>
                </Form>
            </div>
        );
    }
}