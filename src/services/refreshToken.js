import {MYDASH_REFRESH_ENDPOINT, LOGIN_CALLBACK_MYDASH} from "../conf/config"
import axios from 'axios';
import qs from 'querystring';
import history from '../components/common/history'

function refreshToken() {
    let request = qs.stringify({
        'refresh_token': localStorage.getItem("refresh_token"),
        'client_id': process.env.REACT_APP_CLIENT_ID_MYDASH,
    })
    axios.post(MYDASH_REFRESH_ENDPOINT.url, request, {headers: {
        'Content-Type':'application/x-www-form-urlencoded'
    }})
    .then((res) => {
        let access_token = res.data.access_token
        axios.post(LOGIN_CALLBACK_MYDASH.url,  {access_token: access_token},
        {  headers: {
            'Content-Type':'application/json'
            }
        })
        .then((res) => {     
            localStorage.setItem("Authorization", res.data.token)
            history.push('/')
        })
        .catch(() => disconnect())
    }) 
    .catch(() => disconnect())
}

function disconnect() {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("refresh_token")
    history.push("/login")
}

export default refreshToken