import React, { Component } from 'react';
import {LOGIN_CALLBACK_LINKEDIN} from "../../conf/config"
import axios from 'axios';
import history from '../common/history'

export default class CallbackLoginLinkedIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        let urlParams = new URLSearchParams(this.props.location.search)
        let code = urlParams.get('code')

        console.log(code)
        
        axios.post(LOGIN_CALLBACK_LINKEDIN.url, {code: code},
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
                history.push('/login/unknown_error')

            }
        })     
        .catch(() => history.push('/login/unknown_account'))   
    }

    render() {
        return (
            <div></div>
        );
    }
}