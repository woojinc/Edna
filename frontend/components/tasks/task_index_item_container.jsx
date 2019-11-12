import React from 'react';

import { connect } from 'react-redux';
import {
    Switch,
    Route,
    Link,
    withRouter,
} from 'react-router-dom';
import {
    fetchAllTasks,
    fetchTask,
    createTask,
    updateTask,
    deleteTask,
    updateTaskOrder,
} from '../../actions/task_actions';
import {
    AuthRoute,
    ProtectedRoute,
} from '../../util/route_util';

import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';

import Modal from '../modal/modal';

import { merge, isEqual } from 'lodash';

class TaskIndexItem extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { loaded: false };
        this.state = this.props.task;

        this.myInput = React.createRef();
        this.mySpanInput = React.createRef();

        // this.handleCreateTask = this.handleCreateTask.bind(this);
        this.handleChangeNameState = this.handleChangeNameState.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleCompleteTask = this.handleCompleteTask.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
    }

    componentDidMount() {
        const input = this.myInput.current;
        const span = this.mySpanInput.current;
        input.style.width = span.offsetWidth + 7 + "px";
    }

    handleChangeNameState() {
        return e => {
            const input = this.myInput.current;
            const span = this.mySpanInput.current;
            e.target.style.width = span.offsetWidth + 7 + "px";
            this.setState({ name: e.target.value })
        };
    }

    handleChangeName(e) {
        e.stopPropagation();
        if (this.props.task.name !== this.state.name) {
            let updatedTask = this.props.task;
            updatedTask.name = this.state.name;
            this.props.updateTask(updatedTask);
        }
    }

    handleCompleteTask(e) {
        e.stopPropagation();

        let currentTarget = e.currentTarget;
        console.log(!currentTarget.children[3].classList[1]);

        if (e.target.classList[1] === "fa-check" &&
            !currentTarget.children[3].classList[1]) {

            let updatedTask = this.props.task;
            updatedTask.completed = true;
            this.props.updateTask(updatedTask);

            setTimeout(() => {
                currentTarget.children[0].classList.add("task-rainbow-transform")
            }, 250);

            setTimeout(() => {
                currentTarget.children[3].classList.add("task-completed")
                currentTarget.children[0].classList.add("task-rainbow-fadeout")
            }, 1500);

            setTimeout(() => {
                currentTarget.children[0].classList.remove("task-rainbow-transform")
                currentTarget.children[0].classList.remove("task-rainbow-fadeout")
            }, 2250);
        }

        if (e.target.classList[1] === "fa-check" &&
            !!currentTarget.children[3].classList[1]) {

            let updatedTask = this.props.task;
            updatedTask.completed = false;
            this.props.updateTask(updatedTask);

            currentTarget.children[3].classList.remove("task-completed");
        }
    }

    handleDeleteTask(e) {
        e.stopPropagation();
        this.props.deleteTask(this.props.task.section_id, this.props.task.id);
    }

    render() {
        const { dragHandleProps, task, index } = this.props;

        // Should I check if tasks are fully populated?
        // if (tasks === undefined || Object.keys(tasks).length === 0) {
        //     debugger
        //     return null;
        // }

        const taskCompleted = task.completed ? (
                <button className="task-complete task-completed">
                    <i className="fas fa-check"></i>
                </button>
            ) : (
                <button className="task-complete">
                    <i className="fas fa-check"></i>
                </button >
            );

        return (
            <div className="task-row" onClick={this.handleCompleteTask}>
                <div className="task-rainbow"></div>
                <div className="drag-handle" {...dragHandleProps}>
                    <i className="fas fa-grip-vertical"></i>
                </div>
                <div className="task-index">
                    {index + 1}
                </div>
                {taskCompleted}
                <div className="task-name">
                    <span 
                        className="task-name-input-span" 
                        ref={this.mySpanInput}>
                            {this.state.name}
                    </span>
                    <input
                        ref={this.myInput}
                        className="task-name-input"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChangeNameState()}
                        onBlur={this.handleChangeName} />
                </div>
                <div className="task-operation">
                    <button onClick={this.handleDeleteTask}>
                        <i className="fas fa-minus"></i>
                    </button>
                </div>
            </div >
        );
    };
};

const mapStateToProps = (state, { task }) => {
    return {
        // section, prevSection, nextSection, projectId, createSectionItem
        // task,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // Section
        // createSection: (section) => dispatch(createSection(section)),
        // updateSection: (section) => dispatch(updateSection(section)),
        // fetchSection: (id) => dispatch(fetchSection(id)),
        // Task
        // createTask: (task) => dispatch(createTask(task)),
        deleteTask: (sectionId, taskId) => dispatch(deleteTask(sectionId, taskId)),
        updateTask: (task) => dispatch(updateTask(task)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskIndexItem));

