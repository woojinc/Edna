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
import ProjectShow from './project_show';

// import { selectProject } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
    const defaultProject = {
        title: "",
        description: "",
        public_project: true,
        workspace_id: "",
        author_id: state.session.id,
        addDescription: false,
    };
    const { projectId } = ownProps.match.params;
    const { projects } = state.entities;
    const project = projects[projectId] || defaultProject;
    return {
        projectId: projectId,
        project: project,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProject: ( projectId ) => dispatch(fetchProject(projectId)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectShow);