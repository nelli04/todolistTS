import React, {useState} from 'react';
import './App.css';
import {TaskType,Todolist} from './Todolist';

export type ButNameType = 'All' | 'Active' | 'Completed'

function App() {

     let[tasks1, setTasks1] = useState<Array<TaskType>>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    const removeTask = (taskId: number, str: string) => {
            setTasks1(tasks1 = tasks1.filter((t) => t.id !== taskId))

    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks1}
                      removeTask={ removeTask}
            />
        </div>
    );
}

export default App;

//https://www.youtube.com/watch?v=y32tGzV-e1Y&t=884s