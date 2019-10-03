import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
    return {
        errors: errors.session,
        formType: 'Login',
        // navLink: <Link to='/signup'>Sing Up</Link>
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(login(user)),
        otherForm: (
            <div className="redirect-to-signup">
                <span>Don't have an account? </span>            
                <button type="button" onClick={() => dispatch(openModal('signup'))}>
                    Sign Up
                </button>
            </div>
        ),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionForm);

