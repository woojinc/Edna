import {
    OPEN_MODAL,
    CLOSE_MODAL
} from '../actions/modal_actions.js';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions.js';

const modalReducer = (state = null, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return action.modal;
        }
        case CLOSE_MODAL: {
            return null;
        }
        case LOGOUT_CURRENT_USER: {
            return {};
        }
        default:
            return state;
    }
}

export default modalReducer;