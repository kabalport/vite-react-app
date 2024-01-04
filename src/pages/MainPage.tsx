import { useNavigate } from 'react-router-dom';

function MainPage() {
    const nav = useNavigate();

    const navigateTo = (path: string) => {
        nav(path);
    };

    return (
        <div>
            <button onClick={() => navigateTo('/simplecounter')}>
                simple counter
            </button>
            <button onClick={() => navigateTo('/todo')}>
                todoapp
            </button>
            <button onClick={() => navigateTo('/search')}>
                Search
            </button>
            <button onClick={() => navigateTo('/country')}>
                Country
            </button>
            <button onClick={() => navigateTo('/naras')}>
                naras
            </button>
        </div>
    )
}

export default MainPage;
