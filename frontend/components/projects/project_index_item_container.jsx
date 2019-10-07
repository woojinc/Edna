import React from 'react';

import { Link } from 'react-router-dom';

const ProjectIndexItem = ({ project, createProject }) => {
    const { title } = project;

    const projectItem = createProject ? (
        <Link to="/projects/new">
            <div className="project-index-item">
                <div className="project-tile create-project">
                    <i className="fas fa-plus"></i>
                </div >
                <div className="project-title">
                    {project.title}
                </div>
                <div className="project-subtitle">
                </div>
            </div >        
        </Link>
    ) : (
        <Link to={`/projects/${project.id}`}>
            <div className="project-index-item" >
                <div className="project-tile">
                    <i className="far fa-list-alt"></i>
                </div >
                <div className="project-title">
                    {project.title}
                </div>
                <div className="project-subtitle">
                </div>
            </div >
        </Link>
    );


    return (
        projectItem
    );
};

export default ProjectIndexItem;