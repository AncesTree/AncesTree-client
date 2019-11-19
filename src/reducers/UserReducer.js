import { FETCH_AUTHENTICATE_SUCCESS, FETCH_AUTHENTICATE_FAILURE } from '../actions/Login';
import {SET_USER, SET_USER_ID} from "../actions/User";

const initialState = {

};

const user = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AUTHENTICATE_SUCCESS:
            return Object.assign({}, state, {
            });
        case FETCH_AUTHENTICATE_FAILURE:
            return Object.assign({}, state, {
            });
        case SET_USER_ID:
            return Object.assign({}, state, {
                id: action.id
            });
        case SET_USER:
            return Object.assign({}, state, action.user);
        default:
            return state;

    }
};

export default user;