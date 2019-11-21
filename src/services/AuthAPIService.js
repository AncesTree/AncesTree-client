import authFetch from "./authFetch";
import {MYDASH_REFRESH_ENDPOINT, LOGIN_CALLBACK_MYDASH} from "../conf/config"
import { stringify as stringifyQS } from 'querystring';

class AuthAPIService {
    domain = process.env.REACT_APP_AUTH_API;
    static inst = null;

    static getInstance() {
        if (AuthAPIService.inst === null) {
            this.inst = new AuthAPIService()
        }
        return this.inst
    }

    getDomain = () => {
        return this.domain
    };

    /**
     * Return a promise containing the token or an error
     *
     * @returns {Promise<void>}
     */
    async login(email, password) {
        const result = await authFetch(this.getDomain() + '/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await result.json();
        return data.token
    }

    /**
     *  Return a promise with the id of the user or an error
     *
     * @returns {Promise<*>}
     */
    async checkTocken() {
        const result = await authFetch(this.getDomain() + "/auth/checktoken", {method: 'GET'});
        if (result.status === 200) {
            const data = await result.json();
            return data.id
        } else {
            throw new Error(`code ${result.status} : Token probably not valid`)
        }
    }

    disconnect() {
        localStorage.removeItem("Authorization");
        localStorage.removeItem("refresh_token")
    }

    /**
     *
     */
    async refreshToken() {
        const resAccessToken = await authFetch(MYDASH_REFRESH_ENDPOINT.url,
            {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: stringifyQS({
                    'refresh_token': localStorage.getItem("refresh_token"),
                    'client_id': process.env.REACT_APP_CLIENT_ID_MYDASH,
                })
            })
            .catch(err => {
                this.disconnect();
                throw err
            });

        const accessTokenJson = await resAccessToken.json();
        const dataToken = await authFetch(LOGIN_CALLBACK_MYDASH.url,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'access_token': accessTokenJson.access_token
                })
            }).catch(err =>{
            this.disconnect();
            throw err
        });

        if (dataToken.status !== 201){
            this.disconnect();
            throw new Error(`code ${dataToken.status}: invalid refresh_token`);
        }

        const tokenJson = await dataToken.json();
        localStorage.setItem("Authorization", tokenJson.token);
        return tokenJson.token
    }


}

export default AuthAPIService.getInstance()
