import React from 'react';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
import { receiveErrors } from '../../actions/session_actions';
import { connect } from 'react-redux';
import LoginFromContainer from '../session_form/login_form_container';
import SignupFromContainer from '../session_form/signup_form_container';
import DeleteProjectModalContainer from '../projects/delete_project_modal_container';
import EditProjectModalContainer from '../projects/edit_project_modal_container';

const Modal = ({ modal, closeModal, receiveErrors }) => {
    if ( !modal ) {
        return null;
    }
    let component;
    switch (modal) {
        case 'login': {
            component = <LoginFromContainer />;
            // Resets errors at the beggining of a new modal
            receiveErrors([]);
            break;
        }
        case 'signup': {
            component = <SignupFromContainer />;
            // Resets errors at the beggining of a new modal
            receiveErrors([]);
            break;
        }
        case 'deleteProject': {
            component = <DeleteProjectModalContainer />;
            break;
        }
        case 'editProject': {
            component = <EditProjectModalContainer />;
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
        receiveErrors: ( errors ) => dispatch(receiveErrors( errors )),
        closeModal: () => dispatch(closeModal())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));