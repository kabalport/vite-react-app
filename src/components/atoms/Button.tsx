export default function Button({color, children}:any) {
    const onClick: any = () => {
        alert("버튼을 클릭했습니다.");
    };
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: color
            }}>
            {children}
        </button>
    )
}