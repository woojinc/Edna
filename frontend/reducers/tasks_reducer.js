import {
    GET_ALL_TASKS,
    GET_UPDATED_TASKS,
    GET_TASK,
    DELETE_TASK
} from '../actions/task_actions';
import { merge } from 'lodash';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case GET_ALL_TASKS: {
            debugger
            const tasks = action.tasks.tasks;
            // console.log(tasks);
            return merge({}, tasks);
        }
        case GET_UPDATED_TASKS: {
            const tasks = action.tasks
            let newState = merge({}, state)
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i]
                newState = merge({}, newState, { [task.id]: task })
            }
            return newState;
        }
        case GET_TASK: {
            const task = action.task;
            return merge({}, state, { [task.id]: task });
        }
        case DELETE_TASK: {
            const newState = merge({}, state);
            delete newState[action.taskId];
            return newState;
        }
        case LOGOUT_CURRENT_USER: {
            return {};
        }
        default:
            return merge({}, state);
    }
}