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
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export const TodoList: FC<TodoListPropsType> = (
    {
        title,
        tasks,
        addTask,
        removeTask,
        changeTodoListFilter,
        changeTaskStatus,
        filter
    }) => {

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState(false)
    const [isHide, setIsHide] = useState(false)

    const toggleHideTodoList = ()=> setIsHide(!isHide)


    const setTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addNewTaskTitleHandler()

    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeTodoListFilter(filter)
    }

    const addNewTaskTitleHandler = () => {
        const trimmedTaskTitle = taskTitle.trim ()
        if (trimmedTaskTitle) {
            addTask(trimmedTaskTitle)
        }
        else {
            setError(true)
        }
        setTaskTitle("")
    }

    const tasksItems: JSX.Element = tasks.length !== 0
        ? <ul>
            {tasks.map(task => {
                const removeTaskHandler = () => removeTask(task.id)
                const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, event.currentTarget.checked)
                return (
                    <li key={task.id}>
                        <input type="checkbox"
                               checked={task.isDone}
                               onChange={changeTaskStatusHandler}
                        />
                        <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                        <Button title="x" onClickHandler={removeTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <span> Давай, до свидания</span>


    return (
        <div className="todolist">
            <h3>{title}
            <Button title={isHide ? "Show" : "Hide"} onClickHandler={toggleHideTodoList}/>
            </h3>
            {isHide && <div className={"hide-todolist"}> {`In TodoList ${tasks.length} tasks.`}</div> }
            {!isHide && <>
                <div>
                    <input value={taskTitle}
                           onChange={setTaskTitleHandler}
                           onKeyDown={addTaskOnKeyDownHandler}
                           className={error? "task-input-error": ""}
                    />
                    <Button title="+"
                            isDisabled={!taskTitle}
                            onClickHandler={addNewTaskTitleHandler}/>
                    {taskTitle.length > 15 && <div style={{color: "red"}}>Too much</div>}
                    {error && <div style={{color: "red"}}>Enter the task</div>}

                </div>
                {tasksItems}
                <div className={"btn-filter-block"}>
                    <Button title="All"
                            onClickHandler={changeFilterHandlerCreator("all")}
                            classes={filter === "all" ? "btn-filter-active" : "btn-filter"}
                    />
                    <Button title="Active"
                            onClickHandler={changeFilterHandlerCreator("active")}
                            classes={filter === "active" ? "btn-filter-active" : "btn-filter"}
                    />
                    <Button title="Completed"
                            onClickHandler={changeFilterHandlerCreator("completed")}
                            classes={filter === "completed" ? "btn-filter-active" : "btn-filter"}
                    />
                </div>
            </>
            }
        </div>
    )
}