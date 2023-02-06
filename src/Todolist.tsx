import React, {useState} from 'react';
import {ButNameType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number, str: string) => void
    //  filterTask: (butName: ButNameType) => void
}

export function Todolist(props: PropsType) {

    let [filterTasks, setFilterTasks] = useState('All')

    const filterTask = (butName: ButNameType) => {
        setFilterTasks(butName)
    }
    let filteredtask = props.tasks

    if (filterTasks === 'Active') {
        filteredtask = props.tasks.filter(t => t.isDone)
    }
    if (filterTasks === 'Completed') {
        filteredtask = props.tasks.filter(t => !t.isDone)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {filteredtask.map((t) => {
                return <li key={t.id}>
                    <button onClick={() => props.removeTask(t.id, 'hello')}>X</button>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>

                </li>
            })}
        </ul>
        <div>
            <button onClick={() => {
                filterTask('All')
            }}>All
            </button>
            <button onClick={() => {
                filterTask('Active')
            }}>Active
            </button>
            <button onClick={() => {
                filterTask('Completed')
            }}>Completed
            </button>
        </div>
    </div>
}
