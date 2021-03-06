import * as APITaskUtils from '../util/task_api_util';

import { closeModal } from '../actions/modal_actions';

export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const GET_NEW_TASKS = "GET_NEW_TASKS";
export const GET_UPDATED_TASKS = "GET_UPDATED_TASKS";
export const GET_TASK = "GET_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const getAllTasks = ({tasks, ordered_task_ids}) => {
    return {
        type: GET_ALL_TASKS,
        tasks,
        ordered_task_ids,
    }
};

export const getNewtasks = (tasks) => {
    return {
        type: GET_NEW_TASKS,
        tasks
    }
};

export const getUpdatedtasks = (tasks) => {
    return {
        type: GET_UPDATED_TASKS,
        tasks
    }
};

export const getTask = (task) => {
    return {
        type: GET_TASK,
        task
    }
};

export const removeTask = (sectionId, taskId, { tasks, ordered_task_ids }) => {
    return {
        type: DELETE_TASK,
        sectionId,
        taskId,
        tasks,
        ordered_task_ids,
    }
};
// export const removeTask = (taskId) => {
//     return {
//         type: DELETE_TASK,
//         taskId
//     }
// };

export const fetchAllTasks = (sectionId) => dispatch => (
    APITaskUtils.getAllTasks(sectionId)
        .then(tasks => dispatch(getAllTasks(tasks)))
);

export const fetchTask = id => dispatch => (
    APITaskUtils.getTask(id)
        .then(task => dispatch(getTask(task)))
);

export const createTask = task => dispatch => (
    APITaskUtils.createTask(task)
        .then(tasks => dispatch(getAllTasks(tasks)))
);

export const updateTask = task => dispatch => (
    APITaskUtils.updateTask(task)
        .then(task => dispatch(getTask(task)))
    // .then(() => dispatch(closeModal()))
);

export const deleteTask = (sectionId, id) => dispatch => {
    return APITaskUtils.deleteTask(id)
        // .then(tasks => dispatch(getAllTasks(tasks)))    
        .then(tasks => dispatch(removeTask(sectionId, id, tasks)))
    // .then(() => dispatch(closeModal()))
};

export const updateTaskOrder = moveOpInfo => dispatch => {
    return APITaskUtils.updateTaskOrder(moveOpInfo)
        .then(tasks => dispatch(getAllTasks(tasks)))
};




// THIS WORKS!!! DON'T REMOVE UNTIL YOU FIGURE THIS OUT!!!
// export const createtask = task => dispatch => (
//     APItaskUtils.createtask(task)
//         .then(tasks => dispatch(getAlltasks(tasks)))
// );

// export const createtask = ({task, prevtask}) => dispatch => {
//     // APItaskUtils.createtask(task)
//     //     .then(task => dispatch(gettask(task)))\
//     console.log(task)
//     return APItaskUtils.createtask(task)
//         .then(task => {
//             prevtask.next_task_id = task.id;
//             dispatch(updatetask(prevtask));
//             dispatch(gettask(task));
//         })
//         // .then(task => dispatch(gettask(task)));
// };