import { memo, useContext } from "react";
import { TodoDispatchContext } from "../contexts/TodoContext";
import "./TodoItem.css";
import { TodoDispatchContextType } from "../types/TodoTypes"; // 타입 정의 임포트

type TodoItemProps = {
    id: number;
    isDone: boolean;
    createdDate: number;
    content: string;
};

function TodoItem({ id, isDone, createdDate, content }: TodoItemProps) {
    const dispatch = useContext<TodoDispatchContextType | undefined>(TodoDispatchContext);

    if (!dispatch) {
        throw new Error("TodoDispatchContext not found");
    }

    const { onUpdate, onDelete } = dispatch;

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
}

// memo로 감싼 컴포넌트에 명명된 변수를 할당
const MemoizedTodoItem = memo(TodoItem);

// 명명된 변수를 내보냄
export default MemoizedTodoItem;