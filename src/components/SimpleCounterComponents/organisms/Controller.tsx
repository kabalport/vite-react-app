import React from 'react';

// 버튼 컴포넌트의 props 타입 정의
type ButtonProps = {
    text: string;
    onClick: () => void;
};

// 버튼 컴포넌트
const Button = ({ text, onClick }: ButtonProps) => (
    <button onClick={onClick}>{text}</button>
);

// 컨트롤러 컴포넌트의 props 타입 정의
type ControllerProps = {
    onClickButton: (value: number) => void;
};

// 컨트롤러 컴포넌트
const Controller = ({ onClickButton }: ControllerProps) => (
    <div>
        <Button text="-1" onClick={() => onClickButton(-1)} />
        <Button text="-10" onClick={() => onClickButton(-10)} />
        <Button text="-100" onClick={() => onClickButton(-100)} />
        <Button text="+100" onClick={() => onClickButton(100)} />
        <Button text="+10" onClick={() => onClickButton(10)} />
        <Button text="+1" onClick={() => onClickButton(1)} />
    </div>
);

export default Controller;
