import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
// import {TopCars} from "./Component";
// import {Button} from "./component/Button";
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed"

function App() {

    console.log(v1());

    const todoListTitle = "What to Learn"

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "REACT", isDone: true},
        ]
    )


    const removeTask = (taskId: string) => {
        const nextState: Array<TaskType> = tasks.filter(task => task.id !== taskId)
        setTasks(nextState)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = { id: v1(), title: title, isDone: false}
        setTasks([newTask,...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }


    const tasksForTodoList: Array<TaskType> = filter === "active"
        ? tasks.filter(t => !t.isDone)
        : filter === "completed"
            ? tasks.filter(t => t.isDone)
            : tasks


    // const Button1Foo = (subscriber: string, age: number) => {
    //     console.log(subscriber, age)
    // }

    // const Button2Foo = (subscriber: string, age: number) => {
    //     console.log(subscriber, age)
    // }

    // const topCars = [
    //     {id: 1, manufacturer: 'BMW', model: 'm5cs'},
    //     {id: 2, manufacturer: 'Mercedes', model: 'e63s'},
    //     {id: 3, manufacturer: 'Audi', model: 'rs6'},
    // ]


    // let [a, setA] = useState(1)

    // const onClickHandler = () => {
    //     setA(++a);
    //     console.log(a)
    // }


    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                addTask={addTask}
                changeTodoListFilter={changeTodoListFilter}

            />


            {/*<TopCars cars={topCars}/>*/}

            {/*<Button name={"Chanel-1"} callBack={() => Button1Foo("I am VASYA", 21)}/>*/}
            {/*<Button name={"Chanel-2"} callBack={() => Button2Foo("I am IVAN", 31)}/>*/}
            {/*<h1>{a}</h1>*/}
            {/*<button onClick={onClickHandler}>number</button>*/}


            {/*<TodoList title={todoListTitle} tasks={tasks}/>*/}
            {/*<TodoList title={todoListTitle} tasks={tasks}/>*/}
        </div>
    );
}

export default App;
