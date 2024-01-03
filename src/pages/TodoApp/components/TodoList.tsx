import { useState, ChangeEvent } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

// Define a type for the todo object structure
type Todo = {
    id: number;
    content: string;
    // Add other properties of Todo if there are any
};

// Define a type for the component's props
type TodoListProps = {
    todos: Todo[];
    onUpdate: (id: number) => void; // Adjust based on the actual signature of onUpdate
    onDelete: (id: number) => void; // Adjust based on the actual signature of onDelete
};

const TodoList = ({ todos, onUpdate, onDelete }: TodoListProps) => {
    const [search, setSearch] = useState<string>('');

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const filterTodos = () => {
        if (search === '') {
            return todos;
        }
        return todos.filter((todo) =>
            todo.content.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <div className='TodoList'>
            <h4>Todos</h4>
            <input
                value={search}
                onChange={onChangeSearch}
                placeholder='검색어를 입력하세요'
            />
            <div className='todos_wrapper'>
                {filterTodos().map((todo) => (
                    <TodoItem
                        createdDate={0} isDone={false} key={todo.id}
                        {...todo}
                        onUpdate={onUpdate}
                        onDelete={onDelete}                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
