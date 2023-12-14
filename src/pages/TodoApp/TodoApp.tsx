import "./TodoApp.css";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";
import Header from "./components/Header";



const TodoApp = () => (
    <div className="App">
        <Header />
        <TodoEditor />
        <TodoList />
    </div>
);

export default TodoApp;
