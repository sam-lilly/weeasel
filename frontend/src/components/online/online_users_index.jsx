import React from 'react';
import { Link } from 'react-router-dom';
import OnlineUserIndexItem from './online_users_index_item';

class OnlineUsersIndex extends React.Component {

    componentDidMount() {
        this.props.fetchOnlineUsers()
    }

    render () {

        let { onlineUsers, fetchOnlineUser, createFriend } = this.props;

        if (!onlineUsers) return null;

        return (
            <div className="online-users-index">

                <div className="online-users-items">
                    {
                        onlineUsers.map(onlineUser => <OnlineUserIndexItem key={onlineUser.id} onlineUser={onlineUser} fetchOnlineUser={fetchOnlineUser} createFriend={createFriend} />)
                    }
                </div>

            </div>
        )

    }

}

export default OnlineUsersIndex;