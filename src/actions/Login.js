import {LOGIN_URL} from "../conf/config";
import history from "../components/common/history";

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const FETCH_AUTHENTICATE_SUCCESS = 'FETCH_AUTHENTICATE_SUCCESS';
export const FETCH_AUTHENTICATE_FAILURE = 'FETCH_AUTHENTICATE_FAILURE';


export const fetchUserSuccess = results => ({
    type: FETCH_USER_SUCCESS,
    results,
});

export const fetchUserFailure = error => ({
    type: FETCH_USER_FAILURE,
    error,
});

export const fetchUser = id => {
    return dispatch => {

    }
};


export const fetchAuthenticateSuccess = results => ({
    type: FETCH_AUTHENTICATE_SUCCESS,
    results,
});

export const fetchAuthenticateFailure = error => ({
    type: FETCH_AUTHENTICATE_FAILURE,
    error,
});

export const login = (email, password) => {
    return dispatch => {
        // dispatch login
        fetch(LOGIN_URL.url, {
            headers: LOGIN_URL.header,
            method: LOGIN_URL.method,
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(res => {
                dispatch(fetchAuthenticateSuccess(res));
                localStorage.setItem("Authorization", res.token);
                history.push("/");
                return res
            }).catch((error) => {
            dispatch(fetchAuthenticateFailure(error))
        });

        // dispatch to get info from neo4j with id

    }
};