import history from '../components/common/history'
import {LINKEDIN_REGISTRATION_URL, BASIC_REGISTRATION} from '../conf/config'
export const ACCOUNT_CREATION_SUCESS = 'ACCOUNT_CREATION_SUCESS';
export const ACCOUNT_CREATION_ERROR = 'ACCOUNT_CREATION_ERROR';

export const accountCreationSuccess = results => ({
    type: ACCOUNT_CREATION_SUCESS,
    results,
});

export const accountCreationFailure = error => ({
    type: ACCOUNT_CREATION_ERROR,
    error,
});

export const linkedInAccountCreation = (id) => {
    return dispatch => {window.location.href = LINKEDIN_REGISTRATION_URL.url+id}
}

export const basicAccountCreation = (id, email, password) => {
    return dispatch => {
        fetch(BASIC_REGISTRATION.url, {
            method: BASIC_REGISTRATION.method,
            body : JSON.stringify({
                email: email,
                password: password,
                id: id
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(res => {
            dispatch(accountCreationSuccess(res));
            localStorage.setItem("Token", res.token);
            history.push("/")
            return res
        })
        .catch((error) => {
            dispatch(accountCreationFailure(error))
        });
    }
}