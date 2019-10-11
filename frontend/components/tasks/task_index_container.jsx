import { connect } from 'react-redux';

// import { logout } from '../../actions/session_actions';
// import { openModal } from '../../actions/modal_actions';
import {
    fetchAllTasks,
    fetchTask,
    createTask,
    updateTask,
    deleteTask,
    updateTaskOrder,
} from '../../actions/task_actions';
import TaskIndex from './task_index';
import { withRouter } from 'react-router-dom';
import { selectSection } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
    const section = ownProps.section;
    const sectionId = ownProps.sectionId;
    // const sections = selectSection(state);
    // console.log(sections);
    const { session, entities: { users, tasks } } = state;
    return {
        section,
        sectionId,
        currentUser: users[session.id],
        tasks: tasks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // logout: () => dispatch(logout()),
        // openModal: (modal) => dispatch(openModal(modal)),
        createTask: (task) => dispatch(createTask(task)),
        updateTaskOrder: (moveOpInfo) => dispatch(updateTaskOrder(moveOpInfo)),
        fetchAllTasks: (sectionId) => dispatch(fetchAllTasks(sectionId)),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskIndex));

