import { combineReducers } from 'redux'
import tree  from "../reducers/TreeReducer";
import user from '../reducers/UserReducer'

export default combineReducers({
    tree,
    user
})