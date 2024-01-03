import { memo } from 'react';
import "./Header.css";

const Header = memo(() => {
    return (
        <div className="Header">
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
});

export default Header;