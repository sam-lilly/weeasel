import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/styles.scss';

class SplashPage extends React.Component {

    render () {
        return (
            <div className="splash-page">
                <h1>this is the splash page!</h1>
                <h1> collaborative easel 🦦 Weeasel 🦦</h1>
                <footer>
                Created by Sam Lilly, Robby Balistreri, Tahj Harris, Julia Kim
                </footer>
            </div>
        )
    }

}

export default SplashPage;