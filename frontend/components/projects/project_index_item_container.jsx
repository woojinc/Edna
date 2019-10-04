import React from 'react';

const ProjectIndexItem = ({ project, createProject }) => {
    const { title } = project;

    const projectItem = createProject ? (
        <div className="project-index-item">
            <div className="project-tile create-project">
                <i class="fas fa-plus"></i>
            </div >
            <div className="project-title">
                {project.title}
            </div>
            <div className="project-subtitle">
            </div>
        </div >        
    ) : (
        <div className="project-index-item">
            <div className="project-tile">
                <i className="far fa-list-alt"></i>
            </div >
            <div className="project-title">
                {project.title}
            </div>
            <div className="project-subtitle">
            </div>
        </div >
    );


    return (
        projectItem
    );
};

export default ProjectIndexItem;