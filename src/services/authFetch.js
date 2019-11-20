function authFetch(url, init = {}) {

    // headers injection
    let headers;
    if (init.headers === undefined){
        headers = {'Authorization': getToken()}
    } else {
        headers = Object.assign(init.headers,
            {'Authorization': getToken()});
    }

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