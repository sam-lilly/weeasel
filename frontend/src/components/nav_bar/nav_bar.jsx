import React from 'react';
import { Link } from 'react-router-dom';
import GreetingContainer from '../greeting/greeting_container';

class NavBar extends React.Component {


    render () {
        return (
            <div className="nav-container">

                <h1>this is the nav bar</h1>

                <div className="header-left">
                    <Link to="/" className="home" >HOME</Link>
                </div>

                <div className="header-right">
                    <GreetingContainer />
                </div>

            </div>
        )

    }

}


export default NavBar;