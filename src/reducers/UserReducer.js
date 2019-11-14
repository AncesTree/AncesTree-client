import { FETCH_AUTHENTICATE_SUCCESS, FETCH_AUTHENTICATE_FAILURE } from '../actions/Login';

const initialState = {};

const user = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AUTHENTICATE_SUCCESS:
            return Object.assign({}, state, {
            });
        case FETCH_AUTHENTICATE_FAILURE:
            return Object.assign({}, state, {
            });
        default:
            return state;

    }
};

export default user;