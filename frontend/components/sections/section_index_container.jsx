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
import SectionIndex from './section_index';
import { withRouter } from 'react-router-dom';
import { selectSection } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
    const project = ownProps.project;
    const projectId = ownProps.projectId;
    // const sections = selectSection(state);
    // console.log(sections);
    const { session, entities: { users, sections } } = state;
    return {
        project,
        projectId,
        currentUser: users[session.id],
        sections: sections,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // logout: () => dispatch(logout()),
        // openModal: (modal) => dispatch(openModal(modal)),
        updateSectionOrder: (moveOpInfo) => dispatch(updateSectionOrder(moveOpInfo)),
        fetchAllSections: (projectId) => dispatch(fetchAllSections(projectId)),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionIndex));

