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
import NewProjectForm from './new_project_form';

import { selectProject } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
    // const projects = selectProject(state);
    const { session, entities: { users } } = state;
    const project = {
        title: "",
        description: "",
        public_project: true,
        workspace_id: "",
        author_id: state.session.id,
        addDescription: false,
    };
    return {
        currentUser: users[session.id],
        project: project,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // logout: () => dispatch(logout()),
        // openModal: (modal) => dispatch(openModal(modal)),
        createProject: project => dispatch(createProject(project)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProjectForm);

