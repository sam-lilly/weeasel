import React from 'react';
import { Link } from 'react-router-dom';

class FriendIndexItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        let { friend, deleteFriend } = this.props;
        
        if (!friend) return null;


        return (
            <div className="friend-index-boxes">
                <h1>hi! I am YOUR FRIEND index items</h1>
            </div>
        )

    }

}

export default FriendIndexItem;