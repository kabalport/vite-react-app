export default function Button(props:any) {
    const {color, text} = props;

    return (
        <button
            style={{
                backgroundColor: color
            }}>
            {text}</button>
    )
}