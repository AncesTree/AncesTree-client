import authFetch from "./authFetch";

class Neo4jAPIService {
    domain = process.env.REACT_APP_NEO4J_API;
    static inst = null;

    static getInstance() {
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
    async getUser(id) {
        const result = await authFetch(this.getDomain() + "/api/users/" + id);
        if (result.status === 200) {
            return await result.json()
        } else {
            return {}
        }
    }

    async getLineageById(id) {
        const result = await authFetch(this.getDomain() + "/api/query/lineage/" + id)
        return await result.json()
    }

}

export default Neo4jAPIService.getInstance()
