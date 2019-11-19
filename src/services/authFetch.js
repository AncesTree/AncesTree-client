function authFetch(url, init = {}){
    const initComplete = Object.assign(init,
        {
                    headers: {'Authorization': getToken(),
                              'Content-Type': 'application/json'}
                }
            );
    return fetch(url, initComplete)
}

function getToken() {
    return localStorage.getItem("Authorization")
}

export default authFetch