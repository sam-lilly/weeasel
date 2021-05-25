import React from 'react';
import { Link } from 'react-router-dom';

class EaselIndexItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        let { easel, deleteEasel } = this.props;
        
        if (!easel) return null;


        return (
            <div className="easel-index-boxes">
                <h1>hi! I am the easel index items :)</h1>
            </div>
        )

    }

}

export default EaselIndexItem;