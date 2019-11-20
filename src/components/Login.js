import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import {LINKEDIN_LOGIN_URL} from '../conf/config'
import history from './common/history'
import AuthAPIService from "../services/AuthAPIService";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount = () => {
        if (history.location.pathname.includes('unknown_linkedin_account')) {
            alert('Unknown LinkedIn account!')
        }
    };
    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    };
    onSubmit = (event) => {
        event.preventDefault();
        AuthAPIService.login(this.state.email, this.state.password)
            .then(token => {
                localStorage.setItem("Authorization", token);
                history.push("/");
            })
            .catch(err => {
                console.error(err)
            });
    };

    render() {
        return (
            <div className="loginBackground">
                <Form className="loginForm" onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" value={this.state.email}
                                      onChange={this.handleInputChange} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={this.state.password}
                                      onChange={this.handleInputChange} required/>
                    </Form.Group>

                    <Button className="loginButton" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div className="login-box">
                    <a href={LINKEDIN_LOGIN_URL.url} className="social-button" id="linkedin-connect"> <span>Connect with LinkedIn</span></a>
                </div>
            </div>
        );
    }
}