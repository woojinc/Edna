import { 
    GET_ALL_PROJECTS,
    GET_PROJECT,
    DELETE_PROJECT 
} from '../actions/project_actions';
import { merge } from 'lodash';

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
        default:
            return merge({}, state);
    }
}