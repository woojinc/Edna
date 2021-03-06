import {
    GET_ALL_SECTIONS,
    GET_UPDATED_SECTIONS,
    GET_SECTION,
    DELETE_SECTION
} from '../actions/section_actions';
import {
    GET_ALL_TASKS,
    GET_UPDATED_TASKS,
    GET_TASK,
    DELETE_TASK
} from '../actions/task_actions';
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
        case DELETE_TASK: {
            const newState = merge({}, state);
            console.log("action", action);
            const sectionId = action.sectionId;

            delete newState[sectionId].ordered_task_ids;
            // const sectionId = Object.values(action.tasks)[0].section_id;
            // const taskIds = Object.keys(action.tasks).map(Number);
            return merge({}, newState,
                {
                    [sectionId]: {
                        // task_ids: taskIds,
                        ordered_task_ids: action.ordered_task_ids,
                    }
                })

        }
        case GET_ALL_TASKS: {
            const sectionId = Object.values(action.tasks)[0].section_id
            // const taskIds = Object.keys(action.tasks).map(Number);
            return merge({}, state,
                {
                    [sectionId]: {
                        // task_ids: taskIds,
                        ordered_task_ids: action.ordered_task_ids,
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