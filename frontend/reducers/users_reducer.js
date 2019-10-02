import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

export default ( state = {}, action ) => {
    Object.freeze( state );
    switch ( action.type ) {
        case RECEIVE_CURRENT_USER: {
            const currentUser = action.currentUser
            return merge({}, state, { [currentUser.id]: currentUser});
        }
        default:
            return merge({},state);
    }
}