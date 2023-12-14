import { useState } from 'react';
import Viewer from "../molecules/Viewer";
import Even from "../molecules/Even";
import Controller from "../molecules/Controller";
import useInput from "../../hooks/useInput";
import useUpdate from "../../hooks/useUpdate";

function SimpleCounter() {
    const [count, setCount] = useState<number>(0);
    const [text, onChangeText] = useInput("");

    const onClickButton = (value: number) => {
        setCount(count + value);
    };

    useUpdate(() => {
        console.log("APP UPDATE");
    });

    return (
        <div className="App">
            <h1>Simple Counter</h1>
            <section>
                <section>
                    <Viewer count={count} />
                    {count % 2 === 0 && <Even />}
                </section>
            </section>
            <section>
                <Controller onClickButton={onClickButton} />
            </section>
            <input value={text} onChange={onChangeText} />
        </div>
    );
}

export default SimpleCounter;
