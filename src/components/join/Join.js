import React, { Component } from 'react';
import history from '../common/history'

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
        console.log(id)
        const { linkedInAccountCreation } = this.props;
        linkedInAccountCreation(id)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Completez votre inscription</h1>
                    <input
                        type="email"
                        name="email"
                        placeholder="Adresse email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmation"
                        placeholder="Confirmez votre mot de passe"
                        value={this.state.confirmation}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input type="submit" value="Submit"/>
                </form>
                <button onClick={this.linkedInAccountCreation}>Join with LinkedIn</button>
            </div>
        );
    }
}
export default Join;