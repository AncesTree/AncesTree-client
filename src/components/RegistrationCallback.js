import React, { Component } from 'react';
import history from "../components/common/history";

export default class Token extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        window.location.href = 'https://ancestree-auth.igpolytech.fr/oauth/registration_callback'+window.location.href.split('registration_callback')[1]+'&id='+localStorage.getItem("InvitationID")
    }

    render() {
        return (
            <div></div>
        );
    }
}