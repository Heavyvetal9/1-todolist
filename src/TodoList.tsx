import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
}
export const TodoList: FC<TodoListPropsType> = (
    {
        title,
        tasks,
        addTask,
        removeTask,
        changeTodoListFilter
    }) => {

    const [taskTitle, setTaskTitle] = useState("")

    const setTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTaskTitle(event.currentTarget.value)
    const addTaskOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addNewTaskTitleHandler()

    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeTodoListFilter (filter)
    }

    const addNewTaskTitleHandler = () => {
        addTask(taskTitle)
        setTaskTitle("")
    }
    const tasksItems: JSX.Element = tasks.length !== 0
        ? <ul>
            {tasks.map(task => {
                const removeTaskHandler = () => removeTask(task.id)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title="x" onClickHandler={removeTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <span> Давай, до свидания</span>


    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={setTaskTitleHandler}
                       onKeyDown={addTaskOnKeyDownHandler}
                />
                <Button title="+"
                        isDisabled={!taskTitle}
                        onClickHandler={addNewTaskTitleHandler}/>
                {taskTitle.length > 15 && <div style={{color: "red"}}>Слишком много</div>}
            </div>
            {tasksItems}
            <div>
                <Button title="All" onClickHandler={changeFilterHandlerCreator("all")}/>
                <Button title="Active" onClickHandler={changeFilterHandlerCreator("active")}/>
                <Button title="Completed" onClickHandler={changeFilterHandlerCreator("completed")}/>
            </div>
        </div>
    )
}