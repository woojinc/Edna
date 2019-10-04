import { connect } from 'react-redux';

// import { logout } from '../../actions/session_actions';
// import { openModal } from '../../actions/modal_actions';
import {
    fetchAllProjects,
    fetchProject,
    createProject,
    updateProject,
    deleteProject
} from '../../actions/project_actions';
import ProjectIndex from './project_index';

import { selectProject } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
    const projects = selectProject( state );
    const { session, entities: { users } } = state;
    return {
        currentUser: users[session.id],
        projects: projects,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // logout: () => dispatch(logout()),
        // openModal: (modal) => dispatch(openModal(modal)),
        fetchAllProjects: () => dispatch(fetchAllProjects()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectIndex);

