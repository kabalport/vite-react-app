import { useState, useMemo, useContext, ChangeEvent } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import { TodoStateContext } from "../contexts/TodoContext";
import { Todo } from '../types/TodoTypes';

export default function TodoList() {
    const todos = useContext<Todo[] | undefined>(TodoStateContext);

    const [search, setSearch] = useState<string>("");

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const filterTodos = (): Todo[] => {
        if (!todos) return [];
        if (search === "") {
            return todos;
        }
        return todos.filter((todo) =>
            todo.content.toLowerCase().includes(search.toLowerCase())
        );
    };

    const { totalCount, doneCount, notDoneCount } = useMemo(() => {
        if (!todos) return { totalCount: 0, doneCount: 0, notDoneCount: 0 };
        const totalCount = todos.length;
        const doneCount = todos.filter((todo) => todo.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return { totalCount, doneCount, notDoneCount };
    }, [todos]);

    return (
        <div className="TodoList">
            <h4>Todos</h4>
            <div>
                <div>전체 투두 : {totalCount}</div>
                <div>완료 투두 : {doneCount}</div>
                <div>미완 투두 : {notDoneCount}</div>
            </div>
            <input
                value={search}
                onChange={onChangeSearch}
                placeholder="검색어를 입력하세요"
            />
            <div className="todos_wrapper">
                {filterTodos().map((todo) => (
                    <TodoItem key={todo.id} {...todo} />
                ))}
            </div>
        </div>
    );
}
