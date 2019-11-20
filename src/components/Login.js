import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import {MYDASH_AUTHORIZATION_URL, LINKEDIN_AUTHORIZATION_LOGIN_URL} from '../conf/config'
import history from './common/history'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            password: ''
        };
    }

    componentDidMount = () => {
        console.log(process.env.REACT_APP_CLIENT_ID_LINKEDIN)
        if(history.location.pathname.includes('unknown_linkedin_account')){
            alert('Unknown LinkedIn account!')
        }
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
                <div className="login-box">
			        <a href={LINKEDIN_AUTHORIZATION_LOGIN_URL.url} className="social-button" id="linkedin-connect"><span>Connect with LinkedIn</span></a>
                    <a href={MYDASH_AUTHORIZATION_URL.url} className="social-button" id="linkedin-connect"><span>Connect with MyDash</span></a>
                </div>
            </div>
        );
    }
}