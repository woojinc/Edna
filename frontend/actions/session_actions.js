import * as APISession from '../util/session_api_util';
import { closeModal } from './modal_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const receieveCurrentUser = ( currentUser ) => {
    return {
        type: RECEIVE_CURRENT_USER,
        currentUser,
    }
};

export const logoutCurrentUser = ( ) => {
    return {
        type: LOGOUT_CURRENT_USER,
    };
};

export const receiveErrors = ( errors ) => {
    return {
        type: RECEIVE_SESSION_ERRORS,
        errors,
    };
};

export const signup = ( user ) => dispatch => (
    APISession.signup( user )
        .then( user => dispatch(receieveCurrentUser( user )) )
        .then( () => dispatch(closeModal()) )
        .fail( error => dispatch(receiveErrors( error.responseJSON )) )
);

export const login = ( user ) => dispatch => (
    APISession.login( user )
        .then( user => dispatch(receieveCurrentUser( user )) )
        .then( () => dispatch(closeModal()) )
        .fail( error => dispatch(receiveErrors( error.responseJSON )) )
);

export const logout = () => dispatch => (
    APISession.logout()
        .then( user => (
            dispatch(logoutCurrentUser())
        ))
);