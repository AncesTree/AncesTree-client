import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import history from './common/history'
import authFetch from '../services/authFetch'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            phone : '',
            firstname: '',
            lastname: '',
            birthdate: '',
            end_year: 2023,
            mentor: '',
            start_year: 2020,
            privacy: 'private',
            profession: '',
            company: '',
            departement: 'IG'
        };
    }

    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = (event) => {
        console.log(this.state)
        event.preventDefault();
        authFetch('https://ancestree-api-neo4j.igpolytech.fr/api/users', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email : this.state.email,
                phone : this.state.phone,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                birthdate: this.state.birthdate,
                end_year: this.state.end_year.toString(),
                start_year: this.state.start_year.toString(),
                privacy: this.state.privacy,
                profession: this.state.profession,
                company: this.state.company,
                departement: this.state.departement,
                inscription_date: new Date().toDateString()            
            })
        })
        .then(res => {
            console.log(res.body)
            res.json()
        })
        .then( (res) => {
            console.log(res)
            history.push("/");
        }).catch((error) => console.log(error))
    }

    render() {
        const listStartYear = []
        for (let i = 2020; i >= 1987; i--) {
            listStartYear.push(i)
        }
        const listEndYear = []
        for (let i = 2023; i >= 1990; i--) {
            listEndYear.push(i)
        }
        const optionsStart = listStartYear.map( (annee, keyAnnee) => <option key={keyAnnee} value={annee}>{annee}</option>)
        const optionsEnd = listEndYear.map( (annee, keyAnnee) => <option key={keyAnnee} value={annee}>{annee}</option>)
        return (
            <div className="invitationBackground">
                <h4 className="invitationLabel">Completez votre profil Ancestree!</h4>
                <Form className="loginForm" onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Control type="text" name="lastname" placeholder="Nom" value={this.state.lastname} onChange={this.handleInputChange} required />
                            </Col>
                            <Col>
                                <Form.Control type="text" name="firstname" placeholder="Prénom" value={this.state.firstname} onChange={this.handleInputChange} required />
                            </Col>
                        </Row>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email"  name="email" placeholder="Adresse mail" value={this.state.email} onChange={this.handleInputChange} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicCompany">
                        <Form.Control type="text"  name="company" placeholder="Entreprise" value={this.state.company} onChange={this.handleInputChange} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicProfession">
                        <Form.Control type="text"  name="profession" placeholder="Fonction" value={this.state.profession} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicStartYear">
                        <Form.Label>Année d'inscription</Form.Label>
                        <Form.Control as="select" name="start_year" value={this.state.start_year} onChange={this.handleInputChange} required >
                            {optionsStart}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicEndYear">
                        <Form.Label>Année diplomante</Form.Label>
                        <Form.Control as="select" name="end_year" value={this.state.end_year} onChange={this.handleInputChange} required >
                            {optionsEnd}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicDepartement">
                        <Form.Label>Département</Form.Label>
                        <Form.Control as="select" name="departement" value={this.state.departement} onChange={this.handleInputChange} required >
                        <option key={'1'} value={'IG'}>IG</option>
                        <option key={'2'} value={'DO'}>DO</option>
                        <option key={'3'} value={'MEA'}>MEA</option>
                        <option key={'4'} value={'MSI'}>MSI</option>
                        <option key={'5'} value={'GBA'}>GBA</option>
                        <option key={'6'} value={'STE'}>STE</option>
                        <option key={'7'} value={'EGC'}>EGC</option>
                        <option key={'8'} value={'SE'}>SE</option>
                        <option key={'9'} value={'MI'}>MI</option>
                        </Form.Control>                    
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Control type="text"  name="phone" placeholder="Numéro de téléphone" value={this.state.phone} onChange={this.handleInputChange} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicBirthdate">
                        <Form.Control type="date"  name="birthdate" placeholder="Date de naissance" value={this.state.birthdate} onChange={this.handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicConfidentiality">
                        <Form.Label>Confidentialité du compte</Form.Label>
                        <Form.Control as="select" name="privacy" value={this.state.privacy} onChange={this.handleInputChange} required >
                            <option key={1} value={'private'}>Privé</option>
                            <option key={2} value={'public'}>Public</option>
                        </Form.Control>
                    </Form.Group>

                    <Button className="invitationButton" variant="primary" type="submit">
                        Valider
                    </Button>
                </Form>
            </div>
        );
    }
}