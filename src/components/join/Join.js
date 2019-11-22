import React, { Component } from 'react';
import history from '../common/history'
import { Form, Button } from 'react-bootstrap';
import {LINKEDIN_AUTHORIZATION_REGISTER_URL} from '../../conf/config'

class Join extends Component {

    constructor(props) {
        super(props)
        this.state = {
            response: false,
            email : '',
            password: '',
            confirmation: '',
            id: ''
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            id: history.location.pathname.split("/")[2]
        })
        const { basicAccountCreation } = this.props;
        if(this.state.confirmation === this.state.password){
            basicAccountCreation(this.state.id,this.state.email,this.state.password)
        }
    }

    linkedInAccountCreation = (event) => {
        let id = history.location.pathname.split("/")[2]
        localStorage.setItem("InvitationID",id);
        window.location.href = LINKEDIN_AUTHORIZATION_REGISTER_URL.url
    }

    render() {
        return (
            <div className="loginBackground">
                <Form className="loginForm" onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Adresse mail</Form.Label>
                        <Form.Control type="email"  name="email" placeholder="Adresse mail" value={this.state.email} onChange={this.handleInputChange} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Mot de passe" value={this.state.password} onChange={this.handleInputChange} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirmation</Form.Label>
                        <Form.Control type="password" name="confirmation" placeholder="Mot de passe" value={this.state.confirmation} onChange={this.handleInputChange} required />
                    </Form.Group>


                    <Button className="loginButton" variant="primary" type="submit">
                        Valider
                    </Button>
                </Form>
                <div className="login-box">
			        <button onClick={this.linkedInAccountCreation} className="social-button" id="linkedin-connect"> <span>S'inscrire avec LinkedIn</span></button>
		        </div>
            </div>
        );
    }
}
export default Join;