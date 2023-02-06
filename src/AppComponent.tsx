import React from "react";

type PropsTodolist = {
    shapka?: string,
    shapkaOne: string
    tasks1: Array<TaskType>
}

type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: PropsTodolist) => {
    return (
        <div>
            <h3>{props.shapka}</h3>
            <h3>{props.shapkaOne}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>

                <li><input type="checkbox" checked={props.tasks1[0].isDone}/> <span>{props.tasks1[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks1[1].isDone}/> <span>{props.tasks1[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks1[2].isDone}/> <span>{props.tasks1[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
