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

    // componentDidUpdate(prevProps) {
    //     console.log(isEqual(prevProps.sections, this.props.sections));
    //     if (!isEqual(prevProps.sections, this.props.sections)) {
    //         this.props.fetchAllSections(this.props.projectId)
    //             .then(() => this.setState({ loaded: true }));
    //     }
    // }


    render() {
        if (!this.state.loaded) {
            return null;
        }

        const { currentUser, sections, fetchAllSections, project, projectId } = this.props;

        const createSection = {
            name: "Add New Section"
        }

        const nullSection = sections[0];

        // const unsortedSections = sections.slice(1);

        let sortedSections = [nullSection];
        
        for (let i = 0; i < sections.length - 1; i ++) {
            const nextSectionId = sortedSections[i].next_id
            sortedSections.push(sections[nextSectionId]);
        }
        debugger
        const sortedSectionsLastId = sortedSections[sortedSections.length - 1].id

        console.log(sortedSections);
        console.log(sortedSectionsLastId);

        const sectionItems = sections.map(section => {
            return (
                <SectionIndexItemContainer
                    key={section.id}
                    section={section}
                    prevId={null}
                    projectId={projectId}
                    createSectionItem={false} />
            );
        });

        const createSectionItem = (
            <SectionIndexItemContainer
                key={-1}
                section={createSection}
                prevId={sortedSectionsLastId}
                projectId={projectId}
                createSectionItem={true} />
        );
        
        return (
            <div className="home-section-index-view">
                <div className="section-index-title">
                    <h3>Sections</h3>
                </div>
                <div className="section-index-items">
                    {sectionItems}
                    {createSectionItem}
                </div>
            </div>
        );
    };
};

export default SectionIndex;