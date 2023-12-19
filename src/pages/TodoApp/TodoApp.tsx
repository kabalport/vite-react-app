import "./TodoApp.css";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import { useRef, useState } from "react";

interface Todo {
    id: number;
    isDone: boolean;
    content: string;
    createdDate: number;
}

const mockData: Todo[] = [
    {
        id: 0,
        isDone: true,
        content: "React 공부하기",
        createdDate: new Date().getTime(),
    },
    {
        id: 1,
        isDone: false,
        content: "빨래 널기",
        createdDate: new Date().getTime(),
    },
    {
        id: 2,
        isDone: true,
        content: "음악 연습하기",
        createdDate: new Date().getTime(),
    },
];

function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>(mockData);
    const idRef = useRef<number>(3);

    const onCreate = (content: string) => {
        const newTodo: Todo = {
            id: idRef.current++,
            isDone: false,
            content,
            createdDate: new Date().getTime(),
        };
        setTodos([...todos, newTodo]);
    };

    return (
        <div className="App">
            <Header />
            <TodoEditor onCreate={onCreate} />
            <TodoList />
        </div>
    );
}

export default TodoApp;
