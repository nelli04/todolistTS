import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [titleTask, setTitleTask] = useState('');
    const addTasksHandler = () => {
        props.addTask(titleTask)
        setTitleTask('')
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => setTitleTask(event.currentTarget.value)
    const mappedTasksHandler = props.tasks.map(t => <li key={t.id}>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={ () => { props.removeTask(t.id) } }>x</button>
    </li>)
    const onClickAllHandler = () => { props.changeFilter("all") }
    const onClickActiveHandler = () => { props.changeFilter("active") }
    const onClickCompletedHandler = () => { props.changeFilter("completed") }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={titleTask} onChange={onChangeInputHandler}/>
            <button onClick={addTasksHandler}>+</button>
        </div>
        <ul>
            {mappedTasksHandler}
        </ul>
        <div>
            <button onClick={ onClickAllHandler }>
                All
            </button>
            <button onClick={ onClickActiveHandler }>
                Active
            </button>
            <button onClick={ onClickCompletedHandler }>
                Completed
            </button>
        </div>
    </div>
}
