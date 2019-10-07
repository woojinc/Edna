import React from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { merge } from 'lodash';

import { deleteProject } from '../../actions/project_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

class DeleteProjectModal extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteProject = this.handleDeleteProject.bind(this);
    }

    handleDeleteProject(){
        this.props.deleteProject(this.props.project.id);
    }

    render() {
        const { project, closeModal } = this.props;
        return (
            <div className="delete-project-modal-container">
                <div className="delete-project-modal-header">
                    <h3>Delete the "{project.title}" project?</h3>
                    <button
                        className="close-button"
                        type="button"
                        onClick={closeModal}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="delete-project-modal-content">
                    <p>This will delete the project, along with the following:</p>
                    <ul>
                        <li>Any unassigned tasks that are only in this project</li>
                        <li>Any custom fields local to the project</li>
                    </ul>
                </div>
                <div className="delete-project-modal-buttons">
                    <button
                        className="close-delete-project-button"
                        type="button"
                        onClick={closeModal}>
                        Cancel
                    </button>
                    <Link 
                        className="delete-project-button"
                        to="/projects" 
                        onClick={this.handleDeleteProject}>
                        Delete { project.title }
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const defaultProject = {
        title: "",
        description: "",
        public_project: true,
        workspace_id: "",
        author_id: state.session.id,
        addDescription: false,
    };
    const projectId = ownProps.location.pathname.split("/")[2];
    const { projects } = state.entities;
    const project = projects[projectId] || defaultProject;
    return {
        projectId: projectId,
        project: project,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteProject: id => dispatch(deleteProject(id)),
        closeModal: () => dispatch(closeModal())
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteProjectModal));