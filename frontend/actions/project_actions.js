import * as APIProjectUtils from '../util/project_api_util';

import { closeModal } from '../actions/modal_actions';

export const GET_ALL_PROJECTS = "GET_ALL_PROJECTS";
export const GET_PROJECT = "GET_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";

export const getAllProjects = ( projects ) => {
    return {
        type: GET_ALL_PROJECTS,
        projects
    }
};

export const getProject = ( project ) => {
    return {
        type: GET_PROJECT,
        project
    }
};

export const removeProject = ( projectId ) => {
    return {
        type: DELETE_PROJECT,
        projectId
    }
};

export const fetchAllProjects = () => dispatch => (
    APIProjectUtils.getAllProjects()
        .then( projects => dispatch(getAllProjects( projects )))
);

export const fetchProject = id => dispatch => (
    APIProjectUtils.getProject( id )
        .then( project => dispatch(getProject( project )))
);

export const createProject = project => dispatch => (
    APIProjectUtils.createProject( project )
        .then( project => dispatch(getProject( project )))
);

export const updateProject = project => dispatch => (
    APIProjectUtils.updateProject( project )
        .then(project => dispatch(getProject(project)))
        .then(() => dispatch(closeModal()))
);

export const deleteProject = id => dispatch => {
    return APIProjectUtils.deleteProject( id )
        .then( project => dispatch(removeProject( id )))
        .then( () => dispatch(closeModal()))
};