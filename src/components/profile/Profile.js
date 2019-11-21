import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap';
import history from '../common/history'
import authFetch from '../../services/authFetch'

class Profile extends Component {
    constructor(props) {
        super(props)
        
    }

    componentDidMount(){

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

    displayPicture(user){
        if(user.profileImageUrl){
            return <img src={user.profileImageUrl} className="profilepicture" class="card-img " alt="profile picture"/>
        }
        else{
            return <img src="/assets/user.png" className="profilepicture" class="card-img " alt="profile picture"/>
        }
    }

    render() {
        const user = this.props.user
        return (
            <div className="profile">
                <div class="row mt-3 mb-3">
                    <div class="col-md-6 col-sm-12 text-center">
                        <h3 className="name">{user.firstname} {user.lastname}</h3> 
                    </div>
                    <div class="col-md-6 col-sm-12 ">
                        <div class="col-8 offset-2">
                            {this.displayPicture(user)}
                        </div> 
                    </div>
                </div>
                <Form className="loginForm">
            
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Adresse mail</Form.Label>
                    <Form.Control type="email"  name="email" placeholder="Adresse mail" value={user.email} disabled />
                </Form.Group>

                <Form.Group controlId="formBasicStartYear">
                    <Form.Label>Département</Form.Label>
                    <Form.Control type="text"  name="departement" value={user.departement} disabled />
                </Form.Group>

                <Form.Group controlId="formBasicStartYear">
                    <Form.Label>Année d'inscription</Form.Label>
                    <Form.Control type="text"  name="start_year" value={user.start_year} disabled />
                </Form.Group>

                <Form.Group controlId="formBasicEndYear">
                    <Form.Label>Année diplomante</Form.Label>
                    <Form.Control type="text"  name="end_year" value={user.end_year} disabled />
                </Form.Group>

                <Form.Group controlId="formBasicCompany">
                    <Form.Label>Entreprise</Form.Label>
                    <Form.Control type="text"  name="company" placeholder="Entreprise" value={user.company} disabled />
                </Form.Group>

                <Form.Group controlId="formBasicProfession">
                    <Form.Label>Fonction</Form.Label>
                    <Form.Control type="text"  name="profession" placeholder="Fonction" value={user.profession} disabled />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Numéro de téléphone</Form.Label>
                    <Form.Control type="text"  name="phone" placeholder="Numéro de téléphone" value={user.phone} disabled />
                </Form.Group>

                <Form.Group controlId="formBasicBirthdate">
                    <Form.Label>Date de naissance</Form.Label>
                    <Form.Control type="date"  name="birthdate" placeholder="Date de naissance"  value={user.birthdate} disabled />
                </Form.Group>
            </Form>
        </div>

        );
    }
}

const mapDispatchToProps = dispatch => ({
    });
  
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);