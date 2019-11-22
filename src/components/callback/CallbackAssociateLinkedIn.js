import React, { Component } from 'react';
import {ASSOCIATION_CALLBACK_LINKEDIN} from "../../conf/config"
import axios from 'axios';
import history from '../common/history'

export default class CallbackAssociateLinkedIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        let urlParams = new URLSearchParams(this.props.location.search)
        let code = urlParams.get('code')

        
        axios.post(ASSOCIATION_CALLBACK_LINKEDIN.url, {code: code},
        {  headers: {
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem("Authorization")
            }
        })
        .then((res) => {
            console.log(res)
            history.push('/')
        })     
        .catch(() => history.push('/'))   
    }

    render() {
        return (
            <div></div>
        );
    }
}