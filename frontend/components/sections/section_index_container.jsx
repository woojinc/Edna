import { connect } from 'react-redux';

// import { logout } from '../../actions/session_actions';
// import { openModal } from '../../actions/modal_actions';
import {
    fetchAllSections,
    fetchSection,
    createSection,
    updateSection,
    deleteSection,
    updateSectionOrder,
} from '../../actions/section_actions';
import {
    fetchAllTasks,
    fetchTask,
    createTask,
    updateTask,
    deleteTask,
    updateTaskOrder,
} from '../../actions/task_actions';
import SectionIndex from './section_index';
import { withRouter } from 'react-router-dom';
import { selectSection } from '../../reducers/selectors';
import { fetchProject } from '../../actions/project_actions';

const mapStateToProps = (state, ownProps) => {
    const { project, projectId } = ownProps;
    
    const { session, entities } = state;
    const { __projects, sections, tasks } = entities;

    return {
        project,
        projectId,
        currentUser: session.id,
        sections,
        tasks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // logout: () => dispatch(logout()),
        // openModal: (modal) => dispatch(openModal(modal)),

        // Project
        fetchProject: (projectId) => dispatch(fetchProject(projectId)),
        // Sections
        updateSectionOrder: (moveOpInfo) => dispatch(updateSectionOrder(moveOpInfo)),
        fetchAllSections: (projectId) => dispatch(fetchAllSections(projectId)),
        // Tasks
        fetchAllTasks: (sectionId) => dispatch(fetchAllTasks(sectionId)), 
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionIndex));

