export const createTask = (task) => {
    return $.ajax({
        method: 'POST',
        url: `api/sections/${task.section_id}/tasks`,
        data: {
            task
        },
    });
};

export const getAllTasks = (section_id) => {
    return $.ajax({
        method: 'GET',
        url: `api/sections/${section_id}/tasks`,
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
        url: `/api/sections/${moveOpInfo.projectId}/sections/${moveOpInfo.movingSectionId}/tasks/${moveOpInfo.movingtaskId}/update_tasks_order`,
        data: {
            moveOpInfo
        }
    })
}
