import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
    return {
        errors: errors.session,
        formType: 'Sign Up',
        // navLink: <Link to='/login'>Log in</Link>,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(signup(user)),
        otherForm: (
            <button onClick={() => dispatch(openModal('login'))}>
                Sign Up
            </button>
        ),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionForm);

