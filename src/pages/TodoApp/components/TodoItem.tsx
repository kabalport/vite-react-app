import { memo } from 'react';
import "./TodoItem.css";

// Props 타입 정의
type TodoItemProps = {
    id: number;
    isDone: boolean;
    createdDate: number;
    content: string;
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
};

// TodoItem 컴포넌트 정의
const TodoItem = ({
                      id,
                      isDone,
                      createdDate,
                      content,
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

// memo를 사용하여 컴포넌트 내보내기
const MemoizedTodoItem = memo(TodoItem);

export default MemoizedTodoItem;
