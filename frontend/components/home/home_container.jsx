import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import Home from './home';

const mapStateToProps = (state, ownProps) => {
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

