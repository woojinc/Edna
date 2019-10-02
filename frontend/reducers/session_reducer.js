import {
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER,
} from '../actions/session_actions';
import { merge } from 'lodash';

const _nullUser = Object.freeze({
    id: null
});

export default ( state = _nullUser, action ) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER: {
            return merge({}, { id: action.currentUser.id });
        }    
        case LOGOUT_CURRENT_USER: {
            return merge({}, _nullUser);
        } 
        default:
            return merge({}, state);
    }
}