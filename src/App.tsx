import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


// CRUD
// R - filter, sort, search

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType

}
export type TaskTodoType = {
    [todo_1: string]: TaskType[]

}

function App (): JSX.Element {

    const todo_1 = v1()
    const todo_2 = v1()

    const [todo, setTodo] = useState<TodolistType[]>([
        {id: todo_1, title: 'What to leearn', filter: 'all'},
        {id: todo_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskTodoType>({
        [todo_1]: [
            {id: v1(), title: "HTML & CSS", isDone: false},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "React & Redux", isDone: false}],
        [todo_2]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "React & Redux", isDone: false}
        ]

    })



    //BLL:

    const removeTask = (taskId: string, tasksID: string) => {
        //const tasksForTodo = tasks[tasksID]
        //const filteredTasks = tasksForTodo.filter(t => t.id !== tasksID)
        //const copyTask = {...tasks}
        //copyTask[tasksID] = filteredTasks
        //setTasks(copyTask)

        setTasks({...tasks, [tasksID]: tasks[tasksID].filter(t => t.id !== tasksID)})
    }

    const addTask = (title: string, tasksID: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        const tasksId = tasks[tasksID]
        setTasks({...tasks, [tasksID]: [newTask, ...tasksId]})
        //const updatedTasks: TaskType[] = [newTask, ...tasks]
        //setTasks(updatedTasks)
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, tasksID: string) => {
        const tasksId = tasks[tasksID]
        //const changeId = tasksId.
        setTasks({...tasks, [tasksID]: tasks[tasksID].map((t )=> t.id === taskId ? {...t, isDone: newIsDone} : t)})
        //setTasks(tasks)
    }
    //const [filter, setFilter]  = React.useState<FilterValuesType>("all")
    const changeFilterValue = (filter: FilterValuesType, tasksID: string) => {
        setTodo(todo.map(t => t.id === tasksID ? {...t, filter: filter} : t))
    }
    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType):  Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }
    const removeTasks = (tasksID: string) => {

        setTodo(todo.filter(f => f.id !== tasksID))
        //delete tasks[tasksID]
        const copyRemove = {...tasks}
        delete copyRemove[tasksID]
        setTasks(copyRemove)
    }
    const todoComponent = todo.map(t => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[t.id], t.filter)
        return (
            <div>
                <TodoList
                    id={t.id}
                    key={t.id}
                    title={t.title}
                    tasks={filteredTasks}
                    filter={t.filter}
                    changeFilterValue={changeFilterValue}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTasks={removeTasks}
                    tasksID={t.id}
                />
            </div>
        )
    })


    //UI:
    return (
        <div className="App">
            {todoComponent}
        </div>
    );
}

export default App;
