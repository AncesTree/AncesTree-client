// auth
export const AUTH_API = {
    url: 'https://ancestree-auth.igpolytech.fr',
}

export const CHECK_TOKEN_URL = {
    url:'https://ancestree-auth.igpolytech.fr/auth/checktoken',
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
    url: 'https://ancestree-auth.igpolytech.fr/auth/login',
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
    url: 'https://ancestree-auth.igpolytech.fr/invitation/basic',
    method: 'POST'
}

export const REGISTRATION_CALLBACK = {
    url: 'https://ancestree-auth.igpolytech.fr/oauth/registration_callback'
}
