
import './TodoItem.css';

// Define a type for the TodoItem props
type TodoItemProps = {
    content: string;
    createdDate: number; // Assuming createdDate is a timestamp (number)
    isDone: boolean;
    id: number;
    onUpdate: (id: number) => void; // Function type for onUpdate
    onDelete: (id: number) => void; // Function type for onDelete
};

const TodoItem = ({
                      content,
                      createdDate,
                      isDone,
                      id,
                      onUpdate,
                      onDelete,
                  }: TodoItemProps) => {
    const onChangeCheckbox = () => {
        onUpdate(id);
    };

    const onClickDeleteButton = () => {
        onDelete(id);
    };

    return (
        <div className="TodoItem">
            <input
                onChange={onChangeCheckbox}
                type="checkbox"
                checked={isDone}
            />
            <div className="content">{content}</div>
            <div className="date">
                {new Date(createdDate).toLocaleDateString()}
            </div>
            <button onClick={onClickDeleteButton}>삭제</button>
        </div>
    );
};

export default TodoItem;
