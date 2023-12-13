// Viewer 컴포넌트의 props 타입 정의
type ViewerProps = {
    count: number;
};

// Viewer 컴포넌트
const Viewer = ({ count }: ViewerProps) => (
    <div>
        <div>현재 카운트 : </div>
        <h1>{count}</h1>
    </div>
);

export default Viewer;
