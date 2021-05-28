import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {

    render () {
        return (
            <div className="footer">
                <div className="connect">connect with the creators:</div>
                
                <div><a className="julia" target="_blank" href="https://www.linkedin.com/in/julia-kim-350712213/">julia</a></div>
                <div><a className="robby" target="_blank" href="https://www.linkedin.com/in/robert-s-balistreri/">robby</a></div>
                <div><a className="sam" target="_blank" href="https://www.linkedin.com/in/samantha-lilly-a7377a203/">sam</a></div>
                <div><a className="tahj" target="_blank" href="https://www.linkedin.com/in/tahj-harris-b89ab8199/">tahj</a></div>

            </div>
        )
    }

}

export default Footer;