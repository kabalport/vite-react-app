import { useReducer, useRef, useCallback } from 'react';
import './TodoApp.css';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';

type Todo = {
    id: number;
    isDone: boolean;
    content: string;
    createdDate: number;
};

// Action 타입 정의
type Action =
    | { type: 'CREATE'; data: Todo }
    | { type: 'UPDATE'; data: number }
    | { type: 'DELETE'; data: number };

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

// Reducer 함수 타입 적용
function reducer(state: Todo[], action: Action): Todo[] {
    switch (action.type) {
        case 'CREATE':
            return [...state, action.data];
        case 'UPDATE':
            return state.map(it =>
                it.id === action.data ? { ...it, isDone: !it.isDone } : it
            );
        case 'DELETE':
            return state.filter(it => it.id !== action.data);
        default:
            throw new Error('Unhandled action');
    }
}

function TodoApp() {
    const [todos, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef<number>(3);

    // onCreate 함수 타입 적용
    const onCreate = (content: string) => {
        const newTodo: Todo = {
            id: idRef.current++,
            isDone: false,
            content,
            createdDate: new Date().getTime(),
        };
        dispatch({ type: 'CREATE', data: newTodo });
    };

    // onUpdate 함수 타입 적용
    const onUpdate = useCallback((targetId: number) => {
        dispatch({ type: 'UPDATE', data: targetId });
    }, []);

    // onDelete 함수 타입 적용
    const onDelete = useCallback((targetId: number) => {
        dispatch({ type: 'DELETE', data: targetId });
    }, []);

    return (
        <div className="TodoApp">
            <Header />
            <TodoEditor onCreate={onCreate} />
            <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
    );
}

export default TodoApp;
