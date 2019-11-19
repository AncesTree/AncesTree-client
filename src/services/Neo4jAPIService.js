import authFetch from "./authFetch";


class Neo4jAPIService {
    domain = process.env.REACT_APP_NEO4J_API;
    static inst = null;

    static getInstance () {
        if (Neo4jAPIService.inst === null) {
            this.inst = new Neo4jAPIService()
        }
        return this.inst
    }

    getDomain = () => {
        return this.domain
    };

    /**
     * Return a promise with the user or an error
     *
     * @returns {Promise}
     */
    async getUser (id) {
        //console.log(id)
        const result = await authFetch(this.getDomain() + "/api/users/" + id);
        if( result.status === 200){
            const data = await result.json();
            return data
        } else {
            return {}
        }

    }


}

export default Neo4jAPIService.getInstance()
