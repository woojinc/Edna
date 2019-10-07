import { connect } from 'react-redux';

import {
    withRouter
} from 'react-router-dom';

import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import HomeView from './home_view';

const mapStateToProps = (state, ownProps) => {
    const pathParts = ownProps.location.pathname.split("/");
    const { session, entities: { users } } = state;
    return {
        currentUser: users[session.id]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        openModal: (modal) => dispatch(openModal(modal)),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeView));

