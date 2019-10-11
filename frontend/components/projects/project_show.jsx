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

// import Modal from '../modal/modal';
import SectionIndexContainer from '../sections/section_index_container';

class ProjectShow extends React.Component {

    constructor(props){
        super(props);
        this.state = { loaded: false };
    }

    componentDidMount() {
        this.props.fetchProject( this.props.projectId )
            .then(() => this.setState({ loaded: true }));
    }

    render() {
        if (!this.state.loaded) {
            return null;
        }
        const { project, projectId } = this.props
        return (
            <div>
                {project.title}

                <SectionIndexContainer project={project} projectId={projectId} />
            </div>
        );
    };
};

export default ProjectShow;