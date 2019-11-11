import React from 'react';
import {
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import {
    AuthRoute,
    ProtectedRoute,
} from '../../util/route_util';

import Modal from '../modal/modal';
import ProjectIndexItemContainer from './project_index_item_container';

class ProjectIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loaded: false,
            showProjects: false, 
        };
        this.handleShowProject = this.handleShowProject.bind(this);
        this.handleCloseProject = this.handleCloseProject.bind(this);
    }

    handleShowProject(e) {
        e.preventDefault();
        this.setState({ showProjects: true }, () => {
            document.addEventListener('click', this.handleCloseProject);
        });
    }

    handleCloseProject() {
        this.setState({ showProjects: false }, () => {
            document.removeEventListener('click', this.handleCloseProject);
        });
    }

    componentDidMount() {
        this.props.fetchAllProjects()
            .then(() => this.setState({ loaded: true }));
    }

    render() {
        if (!this.state.loaded) {
            return null;
        }
        const { currentUser, projects, fetchAllProjects } = this.props;
        const createProject = {
            title: "New Project"
        }

        const projectItems = projects.map(project => {
            return (
                <ProjectIndexItemContainer
                    key={"project-" + project.id}
                    project={project}
                    createProject={false} />
            );
        });

        const createProjectItem = (
            <ProjectIndexItemContainer
                key={-1}
                project={createProject}
                createProject={true} />
        );

        return (
            <div className="home-project-index-view">
                <div className="project-index-container">
                    <div className="project-index-title">
                        <h3>Projects</h3>
                    </div>
                    <div className="project-index-items">
                        {createProjectItem}
                        {projectItems}
                    </div>
                </div>
            </div>
        );
    };
};

export default ProjectIndex;