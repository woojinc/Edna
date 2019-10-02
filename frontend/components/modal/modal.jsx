import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFromContainer from '../session_form/login_form_container';
import SignupFromContainer from '../session_form/signup_form_container';

const Modal = ({ modal, closeModal }) => {
    if ( !modal ) {
        return null;
    }
    let component;
    switch (modal) {
        case 'login': {
            component = <LoginFromContainer />;
            break;
        }
        case 'signup': {
            component = <SignupFromContainer />;
            break;
        }
        default:
            return null;
    }

    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                { component }
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);