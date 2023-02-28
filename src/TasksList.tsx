import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./TodoList";

type TasksListPropsType = {
    tasksID: string
    tasks: TaskType[]
    removeTask: (taskId: string, tasksID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, tasksID: string) => void
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
        ? props.tasks.map((task) => {
            const taskClasses = task.isDone ? "task task-done" : "task"
            const removeTaskHandler = () => props.removeTask(task.id, props.tasksID)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.tasksID)
            return (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                    />
                    <span className={taskClasses}>{task.title}</span>
                    <button onClick={removeTaskHandler}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>
    return (
        <ul>
            {tasksItems}
        </ul>
    );
};
//https://habr.com/ru/post/540442/
export default TasksList;