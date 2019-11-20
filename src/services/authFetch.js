function authFetch(url, init = {headers: {}}){
    const headers = Object.assign(init.headers, {'Authorization': getToken()});

    const initComplete = Object.assign(init,
        {
                    headers: headers
                }
            );
    return fetch(url, initComplete)
}

function getToken() {
    return localStorage.getItem("Authorization")
}

export default authFetch