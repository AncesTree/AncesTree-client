import authFetch from "./authFetch";


class AuthAPIService {
    domain = process.env.REACT_APP_AUTH_API;
    static inst = null;

    static getInstance () {
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
    async login () {

    }

    /**
     *  Return a promise with the id of the user or an error
     *
     * @returns {Promise<*>}
     */
    async checkTocken () {

        const result = await authFetch(this.getDomain() + "/auth/checktoken");
        if( result.status === 200){
            const data = await result.json();
            return data.id
        } else {
            throw new Error(`code ${result.status} : Token probably not valid`)
        }

    }


}

export default AuthAPIService.getInstance()
