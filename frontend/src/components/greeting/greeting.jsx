import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {

    const signUpLogInGreeting = () => (
        <div className="header-group">
            {/* <h1>redirects to login!</h1> */}
            <Link to="/login" className="user-icon"><i className="far fa-user"></i></Link>
        </div>
    )

    const logInGreeting = () => (
        <div className="header-group">
            {/* <h1>log in greeting!</h1> */}
            {/* <h2 className="header-greeting">Welcome, {currentUser.username} // &nbsp;</h2> */}
            <Link to="/myWeeasel" className="user-icon"><i className="far fa-user"></i></Link>
            <p>&nbsp;|&nbsp;&nbsp;</p>
            <Link to="/" onClick={logout}>LOGOUT</Link>
        </div>
    )

    if (currentUser === undefined || Object.keys(currentUser).length === 0) {
        return signUpLogInGreeting()
    }
    return currentUser ? logInGreeting() : signUpLogInGreeting();

}

export default Greeting;