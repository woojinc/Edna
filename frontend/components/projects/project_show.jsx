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
// import ProjectIndexItemContainer from './project_index_item_container';
import SectionIndexContainer from '../sections/section_index_container';

class ProjectShow extends React.Component {

    componentDidMount() {
        this.props.fetchProject( this.props.projectId );
    }

    render() {
        const { project, projectId } = this.props
        return (
            <div>
                {project.title}
                <SectionIndexContainer project={project} projectId={projectId}/>
            </div>
        );
    };
};

export default ProjectShow;