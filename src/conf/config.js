export const AUTH_API = {
    url: 'https://ancestree-auth.igpolytech.fr',
};

export const BASIC_REGISTRATION = {
    url: AUTH_API.url+'/basic',
    method: 'POST'
};

// Chat
export const GET_CHAT_API = {
    url: 'https://ancestree-chat.igpolytech.fr/',
    header: {'Authorization': localStorage.getItem("Authorization")}
}

export const REGISTRATION_CALLBACK_LINKEDIN = {
    url: AUTH_API.url+'/oauth/linkedin/registration_callback'
};

export const ASSOCIATION_CALLBACK_LINKEDIN = {
    url: AUTH_API.url+'/oauth/linkedin/association_callback'
};


export const LOGIN_CALLBACK_LINKEDIN = {
    url: AUTH_API.url+'/oauth/linkedin/login_callback'
};

export const LOGIN_CALLBACK_MYDASH = {
    url: AUTH_API.url+'/oauth/mydash/callback'
};

export const INVITATION_URL = {
    url: AUTH_API.url + '/invitation',
    method: 'POST',
    header: () => {
        return {'Authorization': localStorage.getItem("Authorization")}
    }
};
export const GET_SEARCH_URL = {
    url: 'https://ancestree-api-neo4j.igpolytech.fr/api/users/find',
    method: 'GET',
    header: () => {
        return {'Authorization': localStorage.getItem("Authorization")}
    }
};

export const MYDASH_TOKEN_ENDPOINT = {
    url: 'https://oauth.igpolytech.fr/token',
    method: 'POST'
};

export const MYDASH_REFRESH_ENDPOINT = {
    url: 'https://oauth.igpolytech.fr/refresh',
    method: 'POST'
};

export const LINKEDIN_REDIRECT_LOGIN_URI = {
    url: 'https://ancestree.igpolytech.fr/callback_linkedin_login'
};

export const LINKEDIN_REDIRECT_JOIN_URI = {
    url: 'https://ancestree.igpolytech.fr/callback_linkedin_join'
};


export const MYDASH_REDIRECT_URI = {
    url: 'https://ancestree.igpolytech.fr/callback_mydash'
};


export const LINKEDIN_AUTHORIZATION_LOGIN_URL = {
    url:'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id='+process.env.REACT_APP_CLIENT_ID_LINKEDIN+'&scope=r_liteprofile%20r_emailaddress%20w_member_social'+'&redirect_uri='+LINKEDIN_REDIRECT_LOGIN_URI.url+'&state=fooobar'
};

export const LINKEDIN_AUTHORIZATION_REGISTER_URL = {
    url:'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id='+process.env.REACT_APP_CLIENT_ID_LINKEDIN+'&scope=r_liteprofile%20r_emailaddress%20w_member_social'+'&redirect_uri='+LINKEDIN_REDIRECT_JOIN_URI.url+'&state=fooobar'
};

export const LINKEDIN_AUTHORIZATION_ASSOCIATE_URL = {
    url:'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id='+process.env.REACT_APP_CLIENT_ID_LINKEDIN+'&scope=r_liteprofile%20r_emailaddress%20w_member_social'+'&redirect_uri=https://ancestree.igpolytech.fr/callback_linkedin_associate&state=fooobar'
}

export const MYDASH_AUTHORIZATION_URL = {
    url: 'https://oauth.igpolytech.fr/authorize?client_id='+process.env.REACT_APP_CLIENT_ID_MYDASH+'&redirect_uri='+MYDASH_REDIRECT_URI.url+'&state=foo'
};
