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
import { DragDropContext } from 'react-beautiful-dnd';

import Modal from '../modal/modal';
import SectionIndexItemContainer from './section_index_item_container';

import { isEqual } from 'lodash';

class SectionIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false };
    }

    componentDidMount() {
        this.props.fetchAllSections(this.props.projectId)
            .then(() => this.setState({ loaded: true }));
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.sections.length !== this.props.sections.length);
        debugger
        if (prevProps.sections.length !== this.props.sections.length) {
            this.props.fetchAllSections(this.props.projectId);
        }
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
        const sectionItems = sections.map(section => {
            return (
                <SectionIndexItemContainer
                    key={section.id}
                    section={section}
                    createSectionItem={false} />
            );
        });

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
        );
        
        return (
            <div className="home-section-index-view">
                <div className="section-index-title">
                    <h3>Sections</h3>
                </div>
                <div className="section-index-items">
                    {/* <DragDropContext onDragEnd={this.onDragEnd}> */}
                        {sectionItems}
                    {/* </DragDropContext> */}
                    {/* {sectionItems} */}
                    {createSectionItem}
                    {/* <SectionIndexItemContainer
                        key={-1}
                        section={{
                            name: "Add New Section",
                            project_id: projectId,
                            prev_section_id: sections[sections.length - 1].id,
                        }}
                        createSectionItem={true} /> */}
                </div>
            </div>
        );
    };
};

export default SectionIndex;