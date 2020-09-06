import React from 'react';
import { Link } from 'react-router-dom';


export default function Header({ setIsLogin }) {

    const logoutSubmit = () => {
        localStorage.clear();
        setIsLogin(false);
    }

    return (
        <header>
            <div className="logo">
                <h2>
                    <Link to="/">Notes App</Link>
                </h2>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">Create Note</Link></li>
                <li onClick={logoutSubmit}><Link to="/">Logout</Link></li>
            </ul>
        </header>
    )
}
