// auth
export const AUTH_API = {
    url: 'https://ancestree-auth.igpolytech.fr',
}

// Neo4j
export const GET_LINEAGE_BY_ID_URL = {
    url: 'https://ancestree-api-neo4j.igpolytech.fr/api/query/lineage/',
    method: 'GET',
    header: {'Authorization': localStorage.getItem("Authorization")}
};

// Chat
export const GET_CHAT_API = {
    url: 'https://ancestree-chat.igpolytech.fr/',
    header: {'Authorization': localStorage.getItem("Authorization")}
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