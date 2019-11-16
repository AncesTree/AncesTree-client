// auth
export const CHECK_TOKEN_URL = {
    url:'https://ancestree-auth.igpolytech.fr/auth/checktoken',
    method: 'GET',
    header: {'Authorization': localStorage.getItem("Authorization")}
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
    header: {'Authorization': localStorage.getItem("Authorization")}
};

// Chat
export const GET_CHAT_API = {
    url: 'http://localhost:4001'
}