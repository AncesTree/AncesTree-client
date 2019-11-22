import authFetch from "./authFetch";

class ChatAPIService {
    domain = process.env.REACT_APP_CHAT_API;
    static inst = null;

    static getInstance() {
        if (ChatAPIService.inst === null) {
            this.inst = new ChatAPIService()
        }
        return this.inst
    }

    getDomain = () => {
        return this.domain
    };

    async getUsers() {
        const result = await authFetch(this.getDomain() + "/users",
            {
                method: 'GET'
            });
        if (result.status === 200) {
            return await result.json()
        } else {
            return {}
        }
    }

    /**
     * Return a promise with the user or an error
     *
     * @returns {Promise}
     */
    async getUser(id) {
        const result = await authFetch(this.getDomain() + "/users/rooms/" + id,
            {
                method: 'GET'
            });
        if (result.status === 200) {
            return await result.json()
        } else {
            return {}
        }
    }

    async postRoom(room) {
        return authFetch(this.getDomain() + `/rooms`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(room)
            });
    }

    async getMessages(id) {
        const result = await authFetch(this.getDomain() + "/rooms/messages/" + id,
            {
                method: 'GET'
            });
        if (result.status === 200) {
            return await result.json()
        } else {
            return {}
        }
    }

    async patchUser(id, modifications) {
        const result = await authFetch(this.getDomain() + "/users/" + id,
            {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(modifications)
            });
        if (result.status === 200) {
            return await result.json()
        } else {
            return {}
        }
    }


}

export default ChatAPIService.getInstance()