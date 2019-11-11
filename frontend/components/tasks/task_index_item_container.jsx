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

        // this.handleCreateTask = this.handleCreateTask.bind(this);
        this.handleChangeNameState = this.handleChangeNameState.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    handleChangeNameState() {
        return e => {
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

    render() {
        const { dragHandleProps, task, index } = this.props;

        // Should I check if tasks are fully populated?
        // if (tasks === undefined || Object.keys(tasks).length === 0) {
        //     debugger
        //     return null;
        // }

        return (
            <div className="task-row">
                <div className="drag-handle" { ...dragHandleProps }>
                    <i className="fas fa-grip-vertical"></i>
                </div>
                {index}
                <i className="far fa-check-circle"></i>
                <div className="task-name">
                    <input
                        className="task-name-input"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChangeNameState()}
                        onBlur={this.handleChangeName} />
                </div>
                <button>

                </button>
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
        updateTask: (task) => dispatch(updateTask(task)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskIndexItem));

