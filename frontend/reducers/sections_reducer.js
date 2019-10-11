import {
    GET_ALL_SECTIONS,
    GET_UPDATED_SECTIONS,
    GET_SECTION,
    DELETE_SECTION
} from '../actions/section_actions';
import { merge } from 'lodash';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { GET_PROJECT } from '../actions/project_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case GET_PROJECT:
        case GET_ALL_SECTIONS: {
            const sections = action.sections;
            return merge({}, state, sections);
        }
        case GET_UPDATED_SECTIONS: {
            const sections = action.sections
            let newState = merge({}, state)
            for(let i = 0; i < sections.length; i++) {
                const section = sections[i]
                newState = merge({}, newState, { [section.id]: section })
            }
            return newState;
        }
        case GET_SECTION: {
            const section = action.section;
            return merge({}, state, { [section.id]: section });
        }
        case DELETE_SECTION: {
            const newState = merge({}, state);
            delete newState[action.sectionId];
            return newState;
        }
        case LOGOUT_CURRENT_USER: {
            return {};
        }
        default:
            return merge({}, state);
    }
}