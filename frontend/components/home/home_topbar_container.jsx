import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';

import HomeTopbar from './home_topbar';


const mapStateToProps = (state, ownProps) => {
    const { root, id } = ownProps.match.params;

    const project = state.entities.projects[id]

    const projectTitle = project ? project.title : null; 

    // const { goingTo } = ownProps.location.state || { goingTo: "" };
    return { root, id, projectTitle };
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        openModal: (modal) => dispatch(openModal(modal)),
    }
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( HomeTopbar ));