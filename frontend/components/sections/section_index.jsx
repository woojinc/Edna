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

import { isEqual } from 'lodash';

class SectionIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false };

        this.sectionItems = this.sectionItems.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllSections(this.props.projectId)
            .then(() => this.setState({ loaded: true }));
    }

    componentDidUpdate(prevProps) {
        // console.log(prevProps.sections.length !== this.props.sections.length);
        // debugger
        if (prevProps.sections.length !== this.props.sections.length) {
            this.props.fetchAllSections(this.props.projectId);
        }
    }

    sectionItems() {
        const sections = this.props.sections.map(section => {
            console.log(section.id);
            return (
                <Draggable draggableId={section.id} index={section.id} key={section.id}>
                    {provided => { return (
                        <div
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                        >
                            <Droppable droppableId={section.id}>
                                {(provided) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.droppableProps}>
                                        <SectionIndexItemContainer
                                            index={section.id}
                                            section={section}
                                            createSectionItem={false} />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    )}}
                </Draggable>
        )});
        return sections;
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
            draggableId, reason 
        } = result;
        console.log(destination.index);
        console.log(source.index);

            if(!destination) {
                return; // no destination then exit
            }

            if (
                destination.droppableId === source.droppableId &&
                destination.index === source.index
            ) {
                return; // when dragged to start location, exit
            }

            const section = this.state.sections[source.droppableId];
            const newSectionIds = Array.from(sections.sectionIds);
            newSectionIds.splice(source.index, 1);
            newSectionIds.splice(destination.index, 0, draggableId);

            const newSection = {
                ...section,
                sectionIds: newSectionIds,
            };

            const newState = {
                ...this.state,
                section:{
                    ...this.state.sections,
                    [newSection.id]: newSection,
                },
            };
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
            prev_section_id: sections[sections.length - 1].id,
        }

        const createSectionItem = (
            <SectionIndexItemContainer
                key={-1}
                section={createSection}
                createSectionItem={true} />
        )
        
        return (
            <div className="home-section-index-view">
                <div className="section-index-title">
                    <h3>Sections</h3>
                </div>
                <div className="section-index-items">
                    <DragDropContext onDragEnd={this.onDrangEnd}>
                        <Droppable 
                            droppableId="all-sections" 
                            direction="vertical" 
                            // type="row"
                        >
                            { provided => {
                                return (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {this.sectionItems()}
                                        {provided.placeholder}
                                    </div>
                                )}
                            }
                        </Droppable>
                    </DragDropContext>
                    {/* <Droppable droppableId={this.props.section.id}>
                        {(provided) => (
                            <div
                                innerRef = {provided.innerRef} 
                                {...provided.droppableProps}>
                                {sectionItems}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable> */}
                    {/* <Draggable draggableId={this.props.project.id} index={this.props.index}>
                        {(provided) => (
                            <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                {this.sectionItems()}
                            </div>
                        )}

                    </Draggable> */}
                    {/* {createSectionItem} */}
                </div>
            </div>
        );
    };
};

export default SectionIndex;