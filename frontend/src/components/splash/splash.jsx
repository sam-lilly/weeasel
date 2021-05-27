import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/styles.scss';

class SplashPage extends React.Component {

    render () {
        return (
            <div className="splash-page">
                <h1>weeasel.</h1>
                <p>a collaborative drawing message board to draw and chat with your friends!</p>

                <img></img>
            </div>
        )
    }

}

export default SplashPage;