import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import {LINKEDIN_LOGIN_URL} from '../conf/config'
import { FaLinkedin } from "react-icons/all";

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            password: ''
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
        const { login } = this.props;
        login(this.state.email, this.state.password);
    };

    render() {
        return (
            <div className="loginBackground">
                <Form className="loginForm" onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"  name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required />
                    </Form.Group>

                    <Button className="loginButton" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div class="login-box">
			        <a href={LINKEDIN_LOGIN_URL.url} class="social-button" id="linkedin-connect"> <span>Connect with LinkedIn</span></a>
		        </div>
            </div>
        );
    }
}