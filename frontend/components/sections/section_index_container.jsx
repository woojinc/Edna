import { connect } from 'react-redux';

// import { logout } from '../../actions/session_actions';
// import { openModal } from '../../actions/modal_actions';
import {
    fetchAllSections,
    fetchSection,
    createSection,
    updateSection,
    deleteSection
} from '../../actions/section_actions';
import SectionIndex from './section_index';

import { selectSection } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
    const project = ownProps.project;
    const projectId = ownProps.projectId
    const sections = selectSection(state);
    console.log(sections);
    const { session, entities: { users } } = state;
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
        fetchAllSections: (projectId) => dispatch(fetchAllSections(projectId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionIndex);

