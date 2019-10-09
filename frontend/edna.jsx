// React
import React from 'react';
import ReactDOM from 'react-dom';
// Components
import Root from './components/root';
import configureStore from './store/store';

//Test
//Util
// import * as APIProjectUtils from './util/project_api_util';
import * as APISectionUtils from './util/section_api_util';

//Actions
// import * as ProjectActions from './actions/project_actions';

document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById("root");

    let store; 
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { 
                id: window.currentUser.id 
            },
        }
        store = configureStore(preloadedState);
    } else {
        store = configureStore();
    }
    // window.store = store;

    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // // Testing APIProjectUtils on Window
    // window.getProject = APIProjectUtils.getProject;
    // window.createProject = APIProjectUtils.createProject;
    // window.updateProject = APIProjectUtils.updateProject;

    // // Testing APISectionUtils on Window
    window.getAllSections = APISectionUtils.getAllSections;
    window.getSection = APISectionUtils.getSection;
    window.createSection = APISectionUtils.createSection;
    window.updateSection = APISectionUtils.updateSection;
    
    // Testing ProjectActions on Window
    // window.fetchAllProjects = ProjectActions.fetchAllProjects;
    // window.fetchProject = ProjectActions.fetchProject;
    // window.createProject = ProjectActions.fetchProject;
    // window.updateProject = ProjectActions.updateProject;
    // window.deleteProject = ProjectActions.deleteProject;

    ReactDOM.render(<Root store={store} />, rootEl);
})