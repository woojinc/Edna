import { 
    GET_ALL_PROJECTS,
    GET_PROJECT,
    DELETE_PROJECT 
} from '../actions/project_actions';
import {
    GET_ALL_SECTIONS,
    GET_NEW_SECTIONS,
    GET_UPDATED_SECTIONS,
    GET_SECTION,
    DELETE_SECTION
} from '../actions/section_actions';
import { merge } from 'lodash';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case GET_ALL_PROJECTS: {
            const projects = action.projects;
            return merge( {}, projects );
        }
        case GET_PROJECT: {
            const project = action.project
            return merge( {}, state, { [project.id]: project } );
        }
        case DELETE_PROJECT: {
            const newState = merge( {}, state );
            delete newState[action.projectId];
            return newState;
        }
        case GET_ALL_SECTIONS: {
            const projectId = Object.values(action.sections)[0].project_id
            const sectionIds = Object.keys(action.sections).map(Number);
            return merge({}, state, 
                { 
                    [projectId]: {
                        section_ids: sectionIds,
                        ordered_section_ids: action.ordered_section_ids,
                    }
            })
        }
        case DELETE_SECTION: {
            const newState = merge({}, state);

            console.log("action", action);
            const projectId = action.projectId;

            delete newState[projectId].ordered_section_ids;
            return merge({}, newState,
                {
                    [projectId]: {
                        // task_ids: taskIds,
                        ordered_section_ids: action.ordered_section_ids,
                    }
                })

        }
        case LOGOUT_CURRENT_USER: {
            return {};
        }
        default:
            return merge({}, state);
    }
}