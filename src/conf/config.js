// auth
export const CHECK_TOKEN_URL = {
    url:'https://ancestree-auth.igpolytech.fr/auth/checktoken',
    method: 'GET'
};

export const LOGIN_URL = {
    url: 'https://ancestree-auth.igpolytech.fr/auth/login',
    method: 'POST'
};

// Neo4j
export const GET_LINEAGE_BY_ID_URL = {
    url: 'https://ancestree-api-neo4j.igpolytech.fr/api/query/lineage/',
    method: 'GET'
};