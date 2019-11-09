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
import { Draggable } from 'react-beautiful-dnd';

import Modal from '../modal/modal';
import SectionIndexItemContainer from './section_index_item_container';

import { merge, isEqual } from 'lodash';

class SectionIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props;
        this.state = { loaded: false };

        this.sectionItems = this.sectionItems.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount() {
        // Things need to happen here: 
        // 1. Update Sections
        // 2. Update Tasks for all Sections
        const { fetchAllSections, fetchAllTasks, fetchProject, projectId } = this.props;

        fetchProject(projectId)
            .then(({ project, sections, tasks }) => {
                // fetchAllTasks(Object.keys(sections)[0])
                // debugger
                const ordered_section_ids = project.ordered_section_ids;
                this.setState({
                    project,
                    ordered_section_ids,
                    sections,
                    tasks
                });
            })
            .then(() => this.setState({ loaded: true }));
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.sections, this.props.sections) ||
            !isEqual(prevProps.project.ordered_section_ids,
                this.props.project.ordered_section_ids)) {
            this.props.fetchAllSections(this.props.projectId);
        }
    }


    sectionItems() {
        // const { project } = this.props;
        const { project, sections, tasks, ordered_section_ids } = this.props; // this.state vs this.props
        // console.log("state", this.state);
        // console.log("ordred_section_ids", ordered_section_ids);
        const sectionItems = project.ordered_section_ids.map((sectionIds, index) => {
            // console.log(section.id);
            return (

                <Draggable
                    draggableId={sectionIds}
                    index={index}
                    key={sectionIds} >

                    {provided => {
                        return (
                            <div
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                            >

                                <Droppable droppableId={sectionIds}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            // {...provided.dragHandleProps}
                                            {...provided.droppableProps}>


                                            <div
                                                className="section-row-container"
                                                key={sectionIds}>
                                                {/* {index} */}

                                                <SectionIndexItemContainer
                                                    index={sectionIds}
                                                    section={sections[sectionIds]}
                                                    dragHandleProps={provided.dragHandleProps}
                                                    tasks={tasks}
                                                    createSectionItem={false} />

                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        )
                    }}
                </Draggable>
            )
        });
        return sectionItems;
    }

    onDragEnd(result) {
        // Sample result
        // result = {
        //     draggableId: 'task-1',
        //     type: 'TYPE',
        //     reason: 'DROP',
        //     source: {
        //         droppableId: 'column-1',
        //         index: 0,
        //     },
        //     destination: {
        //         droppableId: 'column-1',
        //         index: 1,
        //     },
        // }
        const {
            destination,
            source,
            draggableId,
            type,
            reason
        } = result;
        console.log(result);
        console.log(source);
        console.log(destination);

        if (!destination) {
            return; // no destination then exit
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return; // when dragged to start location, exit
        }

        const { project, sections } = this.props;
        const projectId = project.id;

        const moveToSectionId = project.ordered_section_ids[destination.index];
        // console.log(sections);
        // console.log(project.ordered_section_ids);
        // retrieve section id from index id and remove from original array
        const movingSectionId = project.ordered_section_ids.splice(source.index, 1)[0];
        // retrieve section id from index id and add the destination section id in the right place
        project.ordered_section_ids.splice(destination.index, 0, draggableId);
        const moveToIndex = destination.index;

        const updatedOrderedIds = project.ordered_section_ids;


        if (type === 'section') {
            const newPrevId = updatedOrderedIds[destination.index - 1];
            const newNextId = updatedOrderedIds[destination.index + 1];
        } else if (type === 'task') {
            console.log("task was moved")
        }


        // console.log(updatedOrderedIds);
        // console.log(movingSectionId);
        // console.log(moveToIndex);
        // console.log(newPrevId);
        // console.log(newNextId);

        const moveOpInfo = {
            projectId,
            updatedOrderedIds,
            movingSectionId,
            moveToIndex
        }



        this.props.updateSectionOrder(moveOpInfo);

        // const switchingSections = { movingSectionId, newPrevId, newNextId, updatedOrder};
        // const switchingSections = { movingSectionId, moveToIndex, updatedOrderedIds};

        // const newSectionIds = Array.from(sections.sectionIds);
        // newSectionIds.splice(source.index, 1);
        // newSectionIds.splice(destination.index, 0, draggableId);

        // const newSection = {
        //     ...section,
        //     sectionIds: newSectionIds,
        // };

        // const newState = {
        //     ...this.state,
        //     section:{
        //         ...this.state.sections,
        //         [newSection.id]: newSection,
        //     },
        // };
        // this.setState(newState);
    }

    render() {
        if (!this.state.loaded) {
            return null;
        }

        const { currentUser, sections, fetchAllSections, project, projectId } = this.props;

        // const nullSection = sections[0];

        // const unsortedSections = sections.slice(1);

        // let sortedSections = [nullSection];
        // // let sectionItems = [];

        // for (let i = 0; i < unsortedSections.length; i++) {
        //     const nextSectionId = sortedSections[i].next_section_id
        //     sortedSections.push(
        //         sections.find(section => section.id === nextSectionId)
        //     );
        // };

        // for (let i = 0; i < sortedSections.length; i ++) {
        //     const currentSection = sortedSections[i];

        //     const prevSection = currentSection.prev_section_id ? 
        //         ( sortedSections[currentSection.prev_section_id] ) : (null);

        //     const nextSection = currentSection.next_section_id ?
        //         ( sortedSections[currentSection.next_section_id] ) : (null);

        //     const sectionItem = <SectionIndexItemContainer
        //         key={currentSection.id}
        //         prevSection={prevSection}
        //         section={currentSection}
        //         nextSection={nextSection}
        //         projectId={projectId}
        //         createSectionItem={false} />

        //     sectionItems.push(sectionItem);
        // }
        // debugger
        // const sortedSectionsLastId = sortedSections[sortedSections.length - 1].id

        // console.log(sortedSections);
        // console.log(sortedSectionsLastId);

        // const sectionItems = sections.map(section => {
        // return (
        //     <SectionIndexItemContainer
        //         key={section.id}
        //         section={section}
        //         createSectionItem={false} />
        // );
        // });

        const createSection = {
            name: "Add New Section",
            project_id: projectId,
            prev_section_id: project.ordered_section_ids[project.ordered_section_ids.length - 1]
            // prev_section_id: sections[sections.length - 1].id,
        }

        const createSectionItem = (
            <SectionIndexItemContainer
                key={-1}
                section={createSection}
                createSectionItem={true} />
        )

        return (
            <div className="home-section-index-view">
                <div className="section-index-header">
                    <div className="section-index-number">
                        #
                    </div>
                    Task name
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="section-index-items">
                        <Droppable
                            droppableId="all-sections"
                            direction="vertical"
                            type="section"
                        >
                            {provided => {
                                return (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {this.sectionItems()}
                                        {provided.placeholder}
                                    </div>
                                )
                            }
                            }
                        </Droppable>
                    </div>
                </DragDropContext>
                {createSectionItem}
            </div>
        );
    };
};

export default SectionIndex;



// This works for dragging!!! DO NOT REMOVE UNTIL ABOVE WORKS (It Worked)
// const sections = this.props.sections.map((section, index) => {
//     // console.log(section.id);
//     return (
//         <Draggable draggableId={section.id} index={index} key={section.id}>
//             {provided => { return (
//                 <div
//                     {...provided.draggableProps}
//                     ref={provided.innerRef}
//                     {...provided.dragHandleProps}
//                 >
//                     <Droppable droppableId={section.id}>
//                         {(provided) => (
//                             <div
//                             ref={provided.innerRef}
//                             {...provided.dragHandleProps}
//                             {...provided.droppableProps}>
//                                 <SectionIndexItemContainer
//                                     index={section.id}
//                                     section={section}
//                                     createSectionItem={false} />
//                                 {provided.placeholder}
//                             </div>
//                         )}
//                     </Droppable>
//                 </div>
//             )}}
//         </Draggable>
// )});
// return sections;