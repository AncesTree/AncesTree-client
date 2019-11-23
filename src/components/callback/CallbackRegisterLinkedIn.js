import React, { Component } from 'react';
import {REGISTRATION_CALLBACK_LINKEDIN} from "../../conf/config"
import axios from 'axios';
import history from '../common/history'


export default class CallbackRegisterLinkedIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        let urlParams = new URLSearchParams(this.props.location.search)
        let code = urlParams.get('code')

        
        axios.post(REGISTRATION_CALLBACK_LINKEDIN.url, {code: code, id: localStorage.getItem("InvitationID")},
        {  headers: {
            'Content-Type':'application/json'
            }
        })
        .then((res) => {
            if(res.data.token){
                localStorage.setItem("Authorization", res.data.token)
                history.push('/')
            }
            else{
                history.push('/join/'+localStorage.getItem("InvitationID")+'/unknown_error')
            }
        })
        .catch((err) => history.push('/join/'+localStorage.getItem("InvitationID")+'/registration_cancelled'))        
    }

    render() {
        return (
            <div></div>
        );
    }
}