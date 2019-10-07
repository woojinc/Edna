import React from 'react';

import { Link } from 'react-router-dom';

import { merge } from 'lodash';

class NewProjectForm extends React.Component {
    constructor(props){
        super(props);
        this.state = props.project;
        // this.state = {
        //     title: "",
        //     description: "",
        //     public_project: true,
        //     workspace_id: "",
        //     author_id: this.props.currentUser.id,
        //     addDescription: false,
        // };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddDescription = this.handleAddDescription.bind(this);
    }

    handleSubmit( event ) {
        event.preventDefault();
        const { createProject } = this.props;
        const project = merge({}, this.state);
        this.props.createProject(project)
            .then( createdProject => {
                const { project } = createdProject;
                const path = `/projects/${project.id}`;
                this.props.history.push(path);
            });
    }

    handleChange( field ) {
        return e => {
            this.setState({
                [field]: e.target.value
            });
        };
    }

    handleAddDescription( event ) {
        event.preventDefault();
        this.setState({ addDescription: true });
    }

    render() {
        const { title, description, addDescription } = this.state;
        let createProjectButton = false;
        if( title === "") {
            createProjectButton = true;
        }

        const AddDescription = addDescription ? (
            <label>
                Description
            <br />
                <textarea
                    type=""
                    value={description}
                    onChange={this.handleChange('description')}
                    className="new-project-description-textarea"
                />
            </label>) : (
            <button 
                type="button"
                className="new-project-add-a-description-button"
                onClick={this.handleAddDescription}>
                Add a description
            </button >);

            
        return (
            <div className="new-project-container">
                <div className="new-project-arrow-x-container">
                    <Link className="go-back-arrow-button" to="/projects">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <Link className="close-button" to="/projects">
                        <i className="fas fa-times"></i>
                    </Link>
                </div>
                <div className="new-project">
                    <h3 className="new-project-header-text">Add project details</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Project name
                            <br />
                            <input
                                type="text"
                                value={this.state.title}
                                onChange={this.handleChange('title')}
                                className="new-project-title-input"
                                autoFocus
                                required
                            />
                        </label>
                        <br />
                        { AddDescription }
                        <br />
                        <input 
                            type="submit"
                            disabled={ createProjectButton }
                            value="Create project"
                            className="new-project-input-submit"/>
                    </form>
                </div>
            </div>
        )
    };
}

export default NewProjectForm;