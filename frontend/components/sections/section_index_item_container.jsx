import React from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
    createSection,
    updateSection,
    fetchSection,
} from '../../actions/section_actions';
import {
    fetchAllTasks,
    fetchTask,
    createTask,
    updateTask,
    deleteTask,
    updateTaskOrder,
} from '../../actions/task_actions';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import TaskIndexContainer from '../tasks/task_index_container';

class SectionIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.section;
        // Section
        this.handleCreateSection = this.handleCreateSection.bind(this);
        this.handleOpenSection = this.handleOpenSection.bind(this);
        this.handleChangeNameState = this.handleChangeNameState.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        // Task
        this.handleCreateTask = this.handleCreateTask.bind(this);
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

    handleCreateTask(e) {
        const { section, createTask } = this.props;
        console.log(section);
        const orderedTaskIds = section.ordered_task_ids;
        let nextTaskId;
        if (orderedTaskIds.length <= 0) {
            nextTaskId = null
        } else {
            // prevTaskId = orderedTaskIds[orderedTaskIds.length - 1];
            nextTaskId = orderedTaskIds[0];
        }
        console.log(nextTaskId)

        e.preventDefault();

        createTask({
            name: "New Task",
            section_id: section.id,
            // Set prev_task_id to the last one on the list
            next_task_id: nextTaskId,
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
            let updatedSection = this.props.section;
            updatedSection.name = this.state.name;
            this.props.updateSection(updatedSection);
        }
    }

    render() {
        debugger
        const { section, projectId, createSectionItem } = this.props;


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
                    </div >
                </button>
            ) : (
                    <div className="section-block">
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
                            </div>
                            <div className="add-task">
                                <div className="add-task-row">
                                    <button onClick={this.handleCreateTask}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div >
                            </div>
                        </div>

                        <div className="section-task-list">
                            <TaskIndexContainer
                                section={this.props.section}
                                tasks={this.props.tasks} />
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
        // Section
        createSection: (section) => dispatch(createSection(section)),
        updateSection: (section) => dispatch(updateSection(section)),
        fetchSection: (id) => dispatch(fetchSection(id)),
        // Task
        createTask: (task) => dispatch(createTask(task)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SectionIndexItem));


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