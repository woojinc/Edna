import React from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { merge } from 'lodash';

import { 
    fetchProject,
    updateProject } from '../../actions/project_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

class UpdateProjectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.project;
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateProject = this.handleUpdateProject.bind(this);
    }

    handleChange(field) {
        return e => {
            this.setState({
                [field]: e.target.value
            });
        };
    }

    componentDidMount() {
        this.props.fetchProject(this.props.project.id);
    }

    handleUpdateProject() {
        this.props.updateProject(this.state);
    }

    render() {
        const { project, closeModal } = this.props;
        return (
            <div className="update-project-modal-container">
                <div className="update-project-modal-header">
                    <h3>Project details</h3>
                    <button
                        className="close-button"
                        type="button"
                        onClick={closeModal}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="update-project-modal-content">
                    <label>
                        Name
                        <br />
                        <input
                            type="text"
                            value={this.state.title}
                            onChange={this.handleChange('title')}
                            className="update-project-title-input"
                        />
                    </label>
                    <br />
                    <label>
                        Description
                        <br />
                        <textarea
                            value={this.state.description}
                            onChange={this.handleChange('description')}
                            className="update-project-description-textarea"
                        />
                    </label>
                </div>
                <div className="update-project-modal-buttons">
                    <button
                        className="update-project-button"
                        type="button"
                        onClick={this.handleUpdateProject}>
                        Update Project
                    </button>
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
        fetchProject: id => dispatch(fetchProject(id)),
        updateProject: project => dispatch(updateProject(project)),
        closeModal: () => dispatch(closeModal())
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateProjectModal));