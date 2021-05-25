import React from 'react';
import { Link } from 'react-router-dom';

class OnlineUserIndexItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        let { onlineUser, createFriend } = this.props;
        
        if (!onlineUser) return null;


        return (
            <div className="online-user-index-boxes">
                <h1>hi! I am an online person index item</h1>
            </div>
        )

    }

}

export default OnlineUserIndexItem;