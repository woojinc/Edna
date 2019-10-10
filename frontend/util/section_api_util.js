export const createSection = (section) => {
    return $.ajax({
        method: 'POST',
        url: `api/projects/${section.project_id}/sections`,
        data: {
            section
        },
    });
};

export const getAllSections = (project_id) => {
    return $.ajax({
        method: 'GET',
        url: `api/projects/${project_id}/sections`,
    });
};

export const getSection = (id) => {
    return $.ajax({
        method: 'GET',
        url: `api/sections/${id}`,
    });
};

export const updateSection = (section) => {
    return $.ajax({
        method: 'PATCH',
        url: `api/sections/${section.id}`,
        data: {
            section
        },
    });
};

export const deleteSection = (id) => {
    return $.ajax({
        method: 'DELETE',
        url: `api/sections/${id}`,
    });
};

export const updateSectionOrder = (moveOpInfo) => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/projects/${moveOpInfo.projectId}/sections/${moveOpInfo.movingSectionId}/update_sections_order`,
        data: {
            moveOpInfo
        }
    })
}
