// auth
export const AUTH_API = {
    url: 'https://ancestree-auth.igpolytech.fr',
}

export const CHECK_TOKEN_URL = {
    url: process.env.REACT_APP_AUTH_API+'/auth/checktoken',
    method: 'GET',
    header: () => {
        return {'Authorization': localStorage.getItem("Authorization")}
    }
};

export const GET_USER_URL = {
    url:'https://ancestree-api-neo4j.igpolytech.fr/api/users/',
    method: 'GET',
    header: () => {
        return {'Authorization': localStorage.getItem("Authorization")}
    }
};

export const LOGIN_URL = {
    url: AUTH_API.url+'/auth/login',
    method: 'POST',
    header: {'Content-Type': 'application/json'}
};

// Neo4j
export const GET_LINEAGE_BY_ID_URL = {
    url: 'https://ancestree-api-neo4j.igpolytech.fr/api/query/lineage/',
    method: 'GET',
    header: () => {
        return {'Authorization': localStorage.getItem("Authorization")}
    }
};

export const LINKEDIN_REGISTRATION_URL = {
    url: AUTH_API.url + '/oauth/register/'
}

export const BASIC_REGISTRATION = {
    url: AUTH_API.url+'/invitation/basic',
    method: 'POST'
}

export const REGISTRATION_CALLBACK = {
    url: AUTH_API.url+'/oauth/registration_callback'
}

export const LOGIN_CALLBACK = {
    url: AUTH_API.url+'/oauth/login_callback'
}

export const LINKEDIN_LOGIN_URL = {
    url: AUTH_API.url + '/oauth/login'
}