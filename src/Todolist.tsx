import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './app.module.css'

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
    changeCheckbox: (taskID: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>('')

    const [button, setButton] = useState('')
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title);
            setTitle("");
        } else {
            setError('Title is reqired')
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
        setButton('all')
    };
    const onActiveClickHandler = () => {
        props.changeFilter("active")
        setButton('active')
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
        setButton('completed')
    };

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={s.error_message}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeCheckbox(t.id, e.currentTarget.checked)
                    }

                    return <li key={t.id} className={t.isDone ? s.is_done : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={changeCheckboxHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={button === 'all' ? s.active_filter : ''} onClick={onAllClickHandler}>All</button>
            <button className={button === 'active' ? s.active_filter : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={button === 'completed' ? s.active_filter : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
