import {ReactNode} from "react";

type ButtonProps = {
    color?: string;
    children?: ReactNode;
};




const Button = ({ color = "none", children }: ButtonProps) => {
    const onClick = () => {
        alert("버튼을 클릭했습니다.");
    };

    return (
        <button
            onClick={onClick}
            style={{ backgroundColor: color }}>
            {children}
        </button>
    );
}

export default Button;
