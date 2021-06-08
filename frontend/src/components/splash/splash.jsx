import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/styles.scss';
import weeasel from '../../logo/weeasel_use.png';

class SplashPage extends React.Component {

    render () {
        return (
            <div className="splash-page">

                <div className="left-side">

                <Link to="/login" className="weeasel-logo-login">

                    <img className="logo" src={weeasel} alt="weeasel" />
                    <h1 className="weeasel">weeasel.</h1>
                    {/* <Link to="/login" className="weeasel">weeasel.</Link> */}
                </Link>

                {/* <img className="logo" src={weeasel} alt="weeasel" />
                <h1 className="weeasel">weeasel.</h1> */}
                {/* this works above.. experimenting w full highlight */}

                </div>

                <div className="right-side">

                {/* <p><strong>weeasel</strong> is a</p>
                    <p>collaborative</p>
                    <p>drawing and</p>
                    <p>message board</p>
                    created to get you out of your hole
                    <p>and connected</p>
                    <p>with your friends</p>
                    <p>through easels</p> */}

                    <div>
                        <p><strong>weeasel</strong> is a</p>
                        <p>collaborative drawing</p>
                        <p>and messaging board to</p>
                        <p>stay connected with your</p>
                        <p>friends through easels.</p>
                        <p>come out of your hole and</p>
                        <p>onto the drawing board!</p>
                    </div>


                <Link className="join-fun" to="/login">join the fun!</Link>

                </div>


            </div>
        )
    }

}

export default SplashPage;