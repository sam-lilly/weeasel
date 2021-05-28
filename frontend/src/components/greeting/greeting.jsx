import React from 'react';
import { Link } from 'react-router-dom';
import weeasel from '../../logo/weeasel_use.png';

const Greeting = ({ currentUser, logout, setDrawingBoard }) => {

    const signUpLogInGreeting = () => (
        // <div className="header-group">
        //     {/* <h1>redirects to login!</h1> */}
        //     <Link to="/login" className="user-icon"><i className="far fa-user"></i></Link>
        // </div>

        <div className="nav-container">

        <div className="header-left">
            <Link to="/myWeeasel" onClick={() => setDrawingBoard()}className="home-nav" >
                <img className="nav-logo" src={weeasel} alt="weeasel" />
                <h3>{currentUser.username}'s weeasel</h3>
            </Link>
        </div>

        <div className="header-right">
            <div className="header-group">
                {/* <h1>log in greeting!</h1> */}
                <Link to="/myWeeasel" className="user-icon"><i className="far fa-user"></i></Link>
                {/* <h2 className="header-greeting">&nbsp;&nbsp;&nbsp;|&nbsp; {currentUser.username}&nbsp;</h2> */}
                <p>&nbsp;&nbsp;|&nbsp;&nbsp;</p>
                <Link to="/" onClick={logout}>LOGOUT</Link>
            </div>
        </div>

     </div>



    )

    const logInGreeting = () => (
        // <div className="header-group">
        //     {/* <h1>log in greeting!</h1> */}
        //     <Link to="/myWeeasel" className="user-icon"><i className="far fa-user"></i></Link>
        //     <p>&nbsp;|&nbsp;&nbsp;</p>
        //     <Link to="/" onClick={logout}>LOGOUT</Link>
        // </div>
        // **^ was working // what I had prior to this change

        <div className="nav-container">

            <div className="header-left">
                <Link to="/myWeeasel" onClick={() => setDrawingBoard("")}className="home-nav" >
                    <img className="nav-logo" src={weeasel} alt="weeasel" />
                    <h3>{currentUser.username}'s weeasel</h3>
                </Link>
            </div>

            <div className="header-right">
                <div className="header-group">
                    {/* <h1>log in greeting!</h1> */}
                    <Link to="/myWeeasel" className="user-icon"><i className="far fa-user"></i></Link>
                    {/* <h2 className="header-greeting">&nbsp;&nbsp;&nbsp;|&nbsp; {currentUser.username}&nbsp;</h2> */}
                    <p>&nbsp;&nbsp;|&nbsp;&nbsp;</p>
                    <Link to="/" onClick={logout}>LOGOUT</Link>
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