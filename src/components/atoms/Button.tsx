export default function Button({color, children}:any) {

    return (
        <button
            style={{
                backgroundColor: color
            }}>
            {children}
        </button>
    )
}