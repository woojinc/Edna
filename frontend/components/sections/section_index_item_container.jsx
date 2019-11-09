import React from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
    createSection,
    updateSection,
    fetchSection,
} from '../../actions/section_actions';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import TaskIndexContainer from '../tasks/task_index_container';

class SectionIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.section;
        this.handleCreateSection = this.handleCreateSection.bind(this);
        this.handleOpenSection = this.handleOpenSection.bind(this);
        this.handleChangeNameState = this.handleChangeNameState.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    handleCreateSection(e) {
        e.preventDefault();

        this.props.createSection({
            name: "New Section",
            project_id: this.props.section.project_id,
            prev_section_id: this.props.section.prev_section_id,
            // next_section_id: this.props.section.next_section_id
        })
    }

    handleOpenSection() {
        //`/sections/${section.id}`
    }

    handleChangeNameState() {
        return e => {
            this.setState({ name: e.target.value })
        };
    }

    handleChangeName(e) {
        e.stopPropagation();
        if (this.props.section.name !== this.state.name) {
            const updatedSection = this.props.section;
            updatedSection.name = this.state.name;
            this.props.updateSection(updatedSection);
        }
    }
    // taskItems() {
    //     const { project, tasks } = this.props;
    //     // debugger
    //     const taskItems = section.ordered_task_ids.map((taskIds, index) => {
    //         // console.log(task.id);
    //         return (
    //             <Droppable
    //                 droppableId={this.props.section.id}
    //                 direction="vertical"
    //                 type="task"
    //             >
    //                 {provided => {
    //                     return (
    //                         <div
    //                             {...provided.droppableProps}
    //                             ref={provided.innerRef}
    //                         >
    //                             {/* {this.sectionItems()} */}
    //                             <TaskIndexContainer 
    //                                 section={section[sectionIds]}
    //                                 tasks={section[sectionIds].taskIds} />

    //                             {provided.placeholder}
    //                         </div>
    //                     )
    //                 }
    //                 }
    //             </Droppable>
    //         )
    //     });
    //     return taskItems;
    // }

    render() {
        debugger
        const { section, projectId, createSectionItem } = this.props;
        // const sectionItem = createSectionItem ? (
        //     (<button onClick={this.handleCreateSection}>
        //         <div className="section-index-item create-section" >
        //             <div className="section-row">
        //                 <i className="fas fa-plus"></i>
        //             </div >
        //             <div className="section-name">
        //                 Add Section
        //             </div>
        //             <div className="section-subname">
        //             </div>
        //         </div >
        //     </button>)
        // ) : (
        //         (
        //             // button breaks dnd
        //             // <button onClick={this.handleOpenSection}>
        //             <div className="section-index-item" >
        //                 <div className="section-row">
        //                     <i className="far fa-check-circle"></i>
        //                 </div >
        //                 <div className="section-name">
        //                     <input
        //                         type="text"
        //                         value={this.state.name}
        //                         onChange={this.handleChangeNameState()}
        //                         onBlur={this.handleChangeName} />
        //                     {this.state.name}
        //                 </div>
        //                 <div className="section-subname">
        //                 </div>
        //             </div >
        //             // </button>

        //         )
        //     );

        // const sectionItem = section.name;
        // console.log(this.props.index);
        // console.log(sectionItem);
        // debugger
        const dragHandleProps = this.props.dragHandleProps;
        return (
            // sectionItem


            createSectionItem ? (
                // sectionItem
                <button onClick={this.handleCreateSection}>
                    <div className="section-index-item create-section" >
                        <div className="section-row">
                            <i className="fas fa-plus"></i>
                        </div >
                        <div className="section-name">
                            Add Section
                        </div>
                        <div className="section-subname">
                        </div>
                    </div >
                </button>
            ) : (
                    <div className="section-block">
                        {/* {sectionItem} */}
                        <div className="section-index-item" >
                            <div className="drag-handle" {...dragHandleProps} >
                                <i className="fas fa-grip-vertical"></i>
                            </div>

                            <div className="section-name">
                                <input
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleChangeNameState()}
                                    onBlur={this.handleChangeName} />
                                {/* {this.state.name} */}
                            </div>
                            <div className="section-subname">
                            </div>
                        </div>
                        <div className="section-task-list">
                            <Draggable
                                draggableId={"tasks-" + this.props.tasks.id}
                                index={this.props.index}>

                                {(provided) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef} >

                                        {/* TaskIndex */}
                                        <Droppable
                                            droppableId={"tasks-" + this.props.tasks.id}
                                            direction="vertical"
                                            type="task" >
                                            {provided => {
                                                return (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        <div>

                                                            {/* {this.sectionItems()} */}
                                                            <TaskIndexContainer
                                                                section={this.props.section}
                                                                tasks={this.props.tasks} />
                                                        </div>
                                                        <div className="placeholder">
                                                            {provided.placeholder}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            }
                                        </Droppable>
                                    </div>
                                )}
                            </Draggable>
                        </div>

                    </div>
                )
        )
    }
};

const mapStateToProps = (state, { section, tasks, createSectionItem }) => {
    return {
        // section, prevSection, nextSection, projectId, createSectionItem
        section,
        tasks,
        createSectionItem,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createSection: (section) => dispatch(createSection(section)),
        updateSection: (section) => dispatch(updateSection(section)),
        fetchSection: (id) => dispatch(fetchSection(id)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SectionIndexItem));