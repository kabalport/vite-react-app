import { useRef, useState, useContext, ChangeEvent, KeyboardEvent } from "react";
import "./TodoEditor.css";
import { TodoDispatchContext } from "../contexts/TodoContext";
import { TodoDispatchContextType } from "../types/TodoTypes"; // 이 부분은 컨텍스트의 타입 정의를 포함하는 파일을 임포트합니다.

export default function TodoEditor() {
    const dispatch = useContext<TodoDispatchContextType | undefined>(TodoDispatchContext);

    if (!dispatch) {
        throw new Error("TodoDispatchContext not found");
    }
    const { onCreate } = dispatch;

    const [content, setContent] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const onClick = () => {
        if (content === "") {
            inputRef.current?.focus();
            return;
        }
        onCreate(content);
        setContent("");
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClick();
        }
    };

    return (
        <div className="TodoEditor">
            <input
                ref={inputRef}
                value={content}
                onChange={onChangeContent}
                onKeyDown={onKeyDown}
                placeholder="새로운 Todo ..."
            />
            <button onClick={onClick}>추가</button>
        </div>
    );
}
