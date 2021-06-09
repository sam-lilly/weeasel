import React from 'react';
import { Link } from 'react-router-dom';
// import { receiveCurrentUser } from '../../actions/session_actions';
import GreetingContainer from '../greeting/greeting_container';
import '../scss/styles.scss';


class NavBar extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
            // <div className="nav-container">
            <div>
                <div className="nav-background">

                </div>
                {/* <div className="header-left">
                    <Link to="/myWeeasel" className="home-nav" >HOME</Link>
                </div> */}

                {/* <div className="header-right"> */}
                    <GreetingContainer />
                {/* </div> */}

            </div>
        )

    }

}


export default NavBar;