import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER,
} from '../actions/session_actions';
import { merge } from 'lodash';

export default ( state = [], action ) => {
    Object.freeze( state );
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS: {
            // return state.concat(action.errors);
            return action.errors;
        }
        case RECEIVE_CURRENT_USER: {
            return [];
        }
        case LOGOUT_CURRENT_USER: {
            return [];
        }
        default:
            return state;
    }
}