export const createTask = (task) => {
    return $.ajax({
        method: 'POST',
        url: `api/projects/${task.project_id}/tasks`,
        data: {
            task
        },
    });
};

export const getAllTasks = (project_id) => {
    return $.ajax({
        method: 'GET',
        url: `api/projects/${project_id}/tasks`,
    });
};

export const getTask = (id) => {
    return $.ajax({
        method: 'GET',
        url: `api/tasks/${id}`,
    });
};

export const updateTask = (task) => {
    return $.ajax({
        method: 'PATCH',
        url: `api/tasks/${task.id}`,
        data: {
            task
        },
    });
};

export const deleteTask = (id) => {
    return $.ajax({
        method: 'DELETE',
        url: `api/tasks/${id}`,
    });
};
// Probably have to change the below
export const updateTaskOrder = (moveOpInfo) => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/projects/${moveOpInfo.projectId}/sections/${moveOpInfo.movingSectionId}/tasks/${moveOpInfo.movingtaskId}/update_tasks_order`,
        data: {
            moveOpInfo
        }
    })
}
