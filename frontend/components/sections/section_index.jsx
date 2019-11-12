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

        // this.sectionItems = this.sectionItems.bind(this);
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
            !isEqual(prevProps.project.ordered_section_ids, this.props.project.ordered_section_ids) ||
            !isEqual(prevProps.tasks, this.props.tasks)
        ) {
            this.props.fetchAllSections(this.props.projectId);
        }
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
        console.log("result", result);
        console.log("source", source);
        console.log("destin", destination);

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

        const startSectionId = parseInt(source.droppableId.split("section-")[1], 10);
        const finishSectionId = parseInt(destination.droppableId.split("section-")[1], 10);
        console.log("startSectionId", startSectionId);
        console.log("finishSectionId", finishSectionId);

        // const moveToSectionId = project.ordered_section_ids[destination.index];
        // console.log(sections);
        // console.log(project.ordered_section_ids);
        // retrieve section id from index id and remove from original array

        // retrieve section id from index id and add the destination section id in the right place

        const moveToIndex = destination.index;

        if (type === 'section') {

            const sectionDraggableId = parseInt(draggableId.split("section-")[1], 10);

            const movingSectionId = project.ordered_section_ids.splice(source.index, 1)[0];

            project.ordered_section_ids.splice(destination.index, 0, sectionDraggableId);

            const updatedOrderedIds = project.ordered_section_ids;

            const newPrevId = updatedOrderedIds[destination.index - 1];
            const newNextId = updatedOrderedIds[destination.index + 1];

            const moveOpInfo = {
                projectId,
                updatedOrderedIds,
                movingSectionId,
                moveToIndex
            }

            this.props.updateSectionOrder(moveOpInfo);

        } else if (type === 'task') {

            const taskDraggableId = parseInt(draggableId.split("task-")[1], 10);

            if (startSectionId === finishSectionId) {

                const movingSectionId = startSectionId;
                const movingSection = sections[startSectionId];
                console.log("taskDraggableId", taskDraggableId)

                const movingTaskId = movingSection.ordered_task_ids.splice(source.index, 1)[0];

                movingSection.ordered_task_ids.splice(destination.index, 0, taskDraggableId);

                const updatedOrderedIds = movingSection.ordered_task_ids;

                const newPrevId = updatedOrderedIds[destination.index - 1];
                const newNextId = updatedOrderedIds[destination.index + 1];

                const moveOpInfo = {
                    updatedOrderedIds,
                    movingSectionId,
                    movingTaskId,
                    moveToIndex
                }

                console.log("moveOpInfo", moveOpInfo);

                this.props.updateTaskOrder(moveOpInfo);
                console.log("task was moved");
            } else {
                const startSection = sections[startSectionId];
                const startSectionTaskIds = startSection.ordered_task_ids;
                const finishSection = sections[finishSectionId];
                const finishSectionTaskIds = finishSection.ordered_task_ids;

                const movingTaskId = startSectionTaskIds.splice(source.index, 1)[0];
                finishSectionTaskIds.splice(destination.index, 0, taskDraggableId);

                const startSectionMoveOpInfo = {
                    updatedOrderedIds: startSectionTaskIds,
                    movingSectionId: startSectionId,
                    movingTaskId,
                    // moveToIndex
                }
                const finishSectionMoveOpInfo = {
                    updatedOrderedIds: finishSectionTaskIds,
                    movingSectionId: finishSectionId,
                    movingTaskId,
                    moveToIndex
                }
                console.log("startSectionMoveOpInfo", startSectionMoveOpInfo);
                console.log("finishSectionMoveOpInfo", finishSectionMoveOpInfo);
                this.props.updateTaskOrder(startSectionMoveOpInfo);
                this.props.updateTaskOrder(finishSectionMoveOpInfo);
            }

        }

        // console.log(updatedOrderedIds);
        // console.log(movingSectionId);
        // console.log(moveToIndex);
        // console.log(newPrevId);
        // console.log(newNextId);

        // const moveOpInfo = {
        //     projectId,
        //     updatedOrderedIds,
        //     movingSectionId,
        //     moveToIndex
        // }


        // this.props.updateSectionOrder(moveOpInfo);

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
                            key="all-sections"
                        >
                            {provided => {
                                return (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {project.ordered_section_ids.map((sectionIds, index) => {
                                            // console.log(section.id);
                                            const section = sections[sectionIds];
                                            const tasks = section.ordered_task_ids.map(
                                                taskId => this.props.tasks[taskId]
                                            );

                                            return (
                                                <Draggable
                                                    draggableId={"section-" + sectionIds}
                                                    index={index}
                                                    key={"section-" + sectionIds}
                                                >
                                                    {provided => {
                                                        const dragHandleProps = provided.dragHandleProps;
                                                        return (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                            // {...provided.dragHandleProps}
                                                            >
                                                                <div
                                                                    className="section-row-container"
                                                                // key={"section-" + sectionIds}
                                                                >
                                                                    <SectionIndexItemContainer
                                                                        index={sectionIds}
                                                                        section={section}
                                                                        dragHandleProps={dragHandleProps}
                                                                        tasks={tasks}
                                                                        createSectionItem={false} />

                                                                </div>
                                                            </div>
                                                        )
                                                    }}
                                                </Draggable>
                                            );
                                        })}
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