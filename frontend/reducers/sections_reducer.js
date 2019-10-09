import {
    GET_ALL_SECTIONS,
    GET_UPDATED_SECTIONS,
    GET_SECTION,
    DELETE_SECTION
} from '../actions/section_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case GET_ALL_SECTIONS: {
            const sections = action.sections;
            // console.log(sections);
            return merge({}, sections);
        }
        case GET_UPDATED_SECTIONS: {
            const sections = action.sections
            debugger
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
        default:
            return merge({}, state);
    }
}