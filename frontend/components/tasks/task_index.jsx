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

import { merge, isEqual } from 'lodash';

class TaskIndex extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { loaded: false };
        // this.state = this.props.task;
        this.taskItems = this.taskItems.bind(this);

        this.handleCreateTask = this.handleCreateTask.bind(this);
        this.handleChangeNameState = this.handleChangeNameState.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
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
        if (this.props.tasks.name !== this.state.name) {
            const updatedTask = this.props.task;
            updatedTask.name = this.state.name;
            this.props.updateTask(updatedTask);
        }
    }

    taskItems() {
        const { section, tasks } = this.props;

        debugger

        const taskItems = section.ordered_task_ids.map((taskId, index) => {
            const task = tasks[taskId];
            return (
                <Draggable
                    draggableId={taskId}
                    index={index}
                    key={"task-" + taskId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                            // isDragging={snapshot.isDragging}
                            >
                                <div className="task-row">
                                    <div className="drag-handle" {...provided.dragHandleProps}>
                                        <i className="fas fa-grip-vertical"></i>
                                    </div>
                                    {index}
                                    <i className="far fa-check-circle"></i>
                                    <div className="task-name">
                                        <input
                                            className="task-name-input"
                                            type="text"
                                            value={task.name}
                                            onChange={this.handleChangeNameState()}
                                            onBlur={this.handleChangeName} />
                                        {/* {this.state.name} */}
                                    </div>
                                    {/* {task.name} */}
                                </div >
                            </div>
                        )
                    }}
                </Draggable>
            )
        });
        return taskItems;
    }

    handleCreateTask(e) {
        const { section, sectionId, createTask } = this.props;

        e.preventDefault();

        createTask({
            name: "New Task",
            section_id: sectionId,
            // Set prev_task_id to the last one on the list
            prev_task_id: section.ordered_task_ids[ordered_task_ids.length - 1],
        })
    }

    render() {
        const { section, sectionId, tasks, fetchAllTasks } = this.props;

        // Should I check if tasks are fully populated?
        if (tasks === undefined || Object.keys(tasks).length === 0) {
            debugger
            return null;
        }

        return (
            <div className="task-index-title">
                <div className="task-index-items">
                    {this.taskItems()}
                    {/* <button onClick={this.handleCreateTask}>
                        <div className="section-index-item" >
                            <div className="section-row create-task">
                                <i className="fas fa-plus"></i>
                            </div >
                            <div className="task-name">
                                Add Task
                            </div>
                            <div className="task-subname">
                            </div>
                        </div >
                    </button> */}
                </div>
            </div>
        );
    };
};

export default TaskIndex;






// Test Case 1
{/* <Draggable draggableId={taskIds} index={index} key={taskIds}>
        {provided => {
            return (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                >
                    TaskItems!
                </div>
            )
        }}
    </Draggable> */}