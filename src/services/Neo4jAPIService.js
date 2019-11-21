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
        const result = await authFetch(this.getDomain() + "/api/users/" + id,
            {
                method: 'GET'
            });
        if (result.status === 200) {
            return await result.json()
        } else {
            return {}
        }
    }

    async getLineageById(id) {
        const result = await authFetch(this.getDomain() + "/api/query/lineage/" + id,
            {
                method: 'GET'
            })
        return await result.json()
    }

    /**
     * Ask te api to return all the events.
     */
    async getEvents(){
        console.log("BONJOUR")
        const result = await authFetch(this.getDomain() + "/api/events",
        {
            method: 'GET'
        })
        return result.json()
    }

    /**
    * Ask the api to create an event.
    * @param {*} event The event that will be created.
    */
    async createEvent (event) {
        
        var data = new FormData()
    
        for (let key in event) {
            data.append(key, event[key])
        }
    
        return authFetch(this.getDomain() + '/api/events', {
          method: 'POST',
          headers: { },
          body: data
        })
      }

}

export default Neo4jAPIService.getInstance()
