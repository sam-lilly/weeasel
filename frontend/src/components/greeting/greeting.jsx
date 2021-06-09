import React from 'react';
import { Link } from 'react-router-dom';
import weeasel from '../../logo/weeasel_use.png';

const Greeting = ({ currentUser, logout, setDrawingBoard }) => {

    const signUpLogInGreeting = () => (

        <div className="nav-container">

            <div className="header-left">
                <Link to="/" className="home-nav" id="left-signin" >
                    <i className="fas fa-palette"></i><p>&nbsp;</p>
                    <i className="fas fa-paint-brush"></i>
                </Link>
            </div>

            <div className="header-right">
                <div className="header-group">
                {/* <h1>redirects to login!</h1> */}
                <Link to="/login" className="user-icon"><i id="user-right" className="far fa-user"></i></Link>
                </div>
            </div>

        </div>

    )

    const logInGreeting = () => (

        <div className="nav-container">

            <div className="header-left">
                <Link to="/myWeeasel" onClick={() => setDrawingBoard("")} className="home-nav" >
                    <img className="nav-logo" src={weeasel} alt="weeasel" />
                    <h3 className="current-user-nav-bar">{currentUser.username}'s <br/> weeasel</h3>
                </Link>
            </div>

            <div className="header-right">
                <div className="header-group">
                    {/* <h1>log in greeting!</h1> */}
                    <Link to="/myWeeasel" onClick={() => setDrawingBoard("")} className="user-icon">
                        <i id="palette" className="fas fa-palette"></i>&nbsp;<i id="brush" className="fas fa-paint-brush"></i>
                    </Link>
                    {/* <h2 className="header-greeting">&nbsp;&nbsp;&nbsp;|&nbsp; {currentUser.username}&nbsp;</h2> */}
                    <p>&nbsp;|&nbsp;</p>
                    <Link className="logout" to="/" onClick={logout}>logout</Link>
                </div>
            </div>

         </div>


    )

    if (currentUser === undefined || Object.keys(currentUser).length === 0) {
        return signUpLogInGreeting()
    }
    return currentUser ? logInGreeting() : signUpLogInGreeting();

}

export default Greeting;