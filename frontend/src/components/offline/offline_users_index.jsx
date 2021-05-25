import React from 'react';
import { Link } from 'react-router-dom';
import OfflineUserIndexItem from './offline_users_index_item';

class OfflineUsersIndex extends React.Component {

    componentDidMount() {
        this.props.fetchOfflineUsers()
    }

    render () {

        let { offlineUsers, fetchOfflineUser, createFriend } = this.props;

        if (!offlineUsers) return null;

        return (
            <div className="offline-users-index">

                <div className="offline-users-items">
                    {
                        offlineUsers.map(offlineUser => <OfflineUserIndexItem key={offlineUser.id} offlineUser={offlineUser} fetchOfflineUser={fetchOfflineUser} createFriend={createFriend} />)
                    }
                </div>

            </div>
        )

    }

}

export default OfflineUsersIndex;