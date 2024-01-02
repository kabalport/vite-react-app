import { useState, useRef } from 'react';
import './TodoApp.css';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';

type Todo = {
    id: number;
    isDone: boolean;
    content: string;
    createdDate: number; // Assuming createdDate is a timestamp
};

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

    const onUpdate = (targetId: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const onDelete = (targetId: number) => {
        setTodos(todos.filter((todo) => todo.id !== targetId));
    };

    return (
        <div className="TodoApp">
            <Header />
            <TodoEditor onCreate={onCreate} />
            <TodoList
                todos={todos}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
        </div>
    );
}

export default TodoApp;
