import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/styles.scss';

class SplashPage extends React.Component {

    render () {
        return (
            <div className="splash-page">
                <h1>weeasel.</h1>
                <p>a collaborative drawing message board to draw and chat with your friends!</p>
            </div>
        )
    }

}

export default SplashPage;