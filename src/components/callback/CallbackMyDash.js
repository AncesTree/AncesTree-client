import React, { Component } from 'react';
import {MYDASH_TOKEN_ENDPOINT, LOGIN_CALLBACK_MYDASH} from "../../conf/config"
import axios from 'axios';
import qs from 'querystring';
import history from '../common/history'

export default class CallbackMyDash extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        let urlParams = new URLSearchParams(this.props.location.search)
        let code = urlParams.get('code')
        let request = qs.stringify({
            'code': code,
            'client_id': process.env.REACT_APP_CLIENT_ID_MYDASH,
        })
        axios.post(MYDASH_TOKEN_ENDPOINT.url, request, {headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }})
        .then((res) => {
            console.log(res)
            localStorage.setItem("refresh_token", res.data.refresh_token)
            let access_token = res.data.access_token
            axios.post(LOGIN_CALLBACK_MYDASH.url,  {access_token: access_token},
            {  headers: {
                'Content-Type':'application/json'
                }
            })
            .then((res) => {            
                localStorage.setItem("Authorization", res.data.token)
                if(res.data.isRegistered){
                    history.push('/')
                }
                else{
                    history.push('/register')
                }
            })
        })
    }

    render() {
        return (
            <div></div>
        );
    }
}