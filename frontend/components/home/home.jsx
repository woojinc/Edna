import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentUser, logout, openModal }) => {
    const sessionLinks = () => {
        return (
            <nav className="login-signup">
                {/* <Link to="/login">Login</Link> */}
                <button className="login-button" onClick={() => openModal('login')}>Login</button>
                <br />
                {/* <Link to="/signup">Sign up!</Link> */}
                <button className="signup-button" onClick={() => openModal('signup')}>Sign Up</button>
            </nav>
        );
    };
    const greetingMsg = () => {
        return (
            <nav className="hello-logout">
                <h3 className="greeting-name">{currentUser.first_name} {currentUser.last_name}</h3>
                <button className="logout-button" onClick={logout}>Log Out</button>
            </nav>
        );
    };

    return currentUser ? greetingMsg() : sessionLinks();
}