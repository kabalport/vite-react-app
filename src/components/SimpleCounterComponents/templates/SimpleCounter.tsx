import { useState } from 'react';
import Viewer from "../organisms/Viewer";
import Controller from "../organisms/Controller";

function SimpleCounter() {
    const [count, setCount] = useState<number>(0); // 상태 타입 지정

    const onClickButton = (value: number) => { // 함수 매개변수 타입 지정
        setCount(count + value);
    };

    return (
        <div className="App">
            <h1>Simple Counter</h1>
            <section>
                <Viewer count={count} />
            </section>
            <section>
                <Controller onClickButton={onClickButton} />
            </section>
        </div>
    )
}

export default SimpleCounter;
