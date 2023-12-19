import "./TodoEditor.css";
import {useState, useRef, ChangeEvent, KeyboardEvent} from "react";

interface TodoEditorProps {
    onCreate: (content: string) => void;
}

export default function TodoEditor({ onCreate }: TodoEditorProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [content, setContent] = useState("");

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

    const onKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClick();
        }
    };

    return (
        <div className="TodoEditor">
            <input
                ref={inputRef}
                value={content}
                onChange={onChangeContent}
                onKeyDown={onKeydown}
                placeholder="새로운 Todo ..."
            />
            <button onClick={onClick}>추가</button>
        </div>
    );
}