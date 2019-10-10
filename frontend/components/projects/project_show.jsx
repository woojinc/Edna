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

import { Droppable, DragDropContext } from 'react-beautiful-dnd';

// import Modal from '../modal/modal';
// import ProjectIndexItemContainer from './project_index_item_container';
import SectionIndexContainer from '../sections/section_index_container';

class ProjectShow extends React.Component {

    constructor(props){
        super(props);
        this.state = { loaded: false };

        // this.onDragEnd = this.onDragEnd.bind(this);
        // this.sectionIndex = this.sectionIndex.bind(this);
    }

    componentDidMount() {
        this.props.fetchProject( this.props.projectId )
            .then(() => this.setState({ loaded: true }));
    }

    // onDragEnd(result) {
    //     const { destination, source, draggableId, reason } = result;
    // }

    // sectionIndex() {
    //     const { project, projectId } = this.props
    //     debugger
    //     // const project = this.props.project.map(project => {
        
    //     return (
    //         <Droppable droppableId={project.id} key={project.id}>
    //             {(provided) => (
    //                 <div key= { project.id }
    //                     ref={provided.innerRef}>
    //                         <SectionIndexContainer
    //                             {...provided.droppableProps}
    //                             project={project} 
    //                             projectId={projectId} 
    //                             index={project.id}/>
    //                     {provided.placeholder}
    //                 </div>
    //             )}
    //         </Droppable>
    //     );
    //     // });
    //     // return project;
    // }

    render() {
        if (!this.state.loaded) {
            return null;
        }
        const { project, projectId } = this.props
        return (
            <div>
                {project.title}
                {/* <DragDropContext onDragEnd={this.onDragEnd}>
                    {this.sectionIndex()}
                </DragDropContext> */}

                <SectionIndexContainer project={project} projectId={projectId} />
            </div>
        );
    };
};

export default ProjectShow;