import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
    
    const signUpLogInGreeting = () => (
        <div className="header-group">
            <Link to="/login" className="user-icon"><i className="far fa-user"></i></Link>
        </div>
    )

    const logInGreeting = () => (
        <div className="header-group">
            {/* <h2 className="header-greeting">Welcome, {currentUser.username} // &nbsp;</h2> */}
            <Link to="/account" className="user-icon"><i className="far fa-user"></i></Link>
            <p>&nbsp;|&nbsp;&nbsp;</p>
            <Link to="/" onClick={logout}>LOGOUT</Link>
        </div>
    )

    return currentUser ? logInGreeting() : signUpLogInGreeting();

}

export default Greeting;