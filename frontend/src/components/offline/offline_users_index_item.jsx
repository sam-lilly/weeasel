import React from 'react';
import { Link } from 'react-router-dom';

class OfflineUserIndexItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        let { offlineUser, createFriend } = this.props;
        
        if (!offlineUser) return null;


        return (
            <div className="offline-user-index-boxes">
                <h1>hi! I am an offline person index item</h1>
            </div>
        )

    }

}

export default OfflineUserIndexItem;