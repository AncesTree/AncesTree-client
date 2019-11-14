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

export const accountCreation = (id, email, password) => {
    return dispatch => {
        fetch('https://ancestree-auth.igpolytech.fr/invitation', {
            method: 'put',
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
            return res
        })
        .catch((error) => {
            dispatch(accountCreationFailure(error))
        });
    }
}