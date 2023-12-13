import Viewer from "../organisms/Viewer";
import Controller from "../organisms/Controller";
import { useState } from "react";

function SimpleCounter() {
    const [count, setCount] = useState(0);

    const onClickButton = (value) => {
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