import React, { Component } from 'react';
import history from "../components/common/history";
import {REGISTRATION_CALLBACK} from "../conf/config"

export default class Token extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        window.location.href = REGISTRATION_CALLBACK.url+window.location.href.split('registration_callback')[1]+'&id='+localStorage.getItem("InvitationID")
    }

    render() {
        return (
            <div></div>
        );
    }
}