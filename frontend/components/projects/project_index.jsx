import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import {
    AuthRoute,
    ProtectedRoute,
} from '../../util/route_util';

import Modal from '../modal/modal';
import ProjectIndexItemContainer from './project_index_item_container';

class ProjectIndex extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = this.props;
    // }

    componentDidMount(){
        this.props.fetchAllProjects();
    }

    render() {
        const { currentUser, projects, fetchAllProjects } = this.props;
        const createProject = {
            title: "New Project"
        }

        const projectItems = projects.map(project => {
            return (
                <ProjectIndexItemContainer 
                    key={ project.id + 1 } 
                    project={ project } 
                    createProject={ false } /> 
            );
        });

        const createProjectItem = (
            <ProjectIndexItemContainer 
                key={ 0 } 
                project={ createProject } 
                createProject={ true } />
        );

        return (
            <div className="home-project-index-view">
                <div className="project-index-title">
                    <h3>Projects</h3>
                </div>
                <div className="project-index-items">
                    { createProjectItem }
                    { projectItems }
                </div>
            </div>
        );
    };
};

export default ProjectIndex;