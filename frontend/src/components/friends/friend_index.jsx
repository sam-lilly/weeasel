import React from 'react';
import { Link } from 'react-router-dom';
import FriendIndexItem from './friend_index_item';

class FriendIndex extends React.Component {

    componentDidMount() {
        this.props.fetchFriends()
    }

    render () {

        let { friends, fetchFriend, deleteFriend } = this.props;

        if (!friends) return null;

        return (
            <div className="friends-index">

                <div className="friend-items">
                    {
                        friends.map(friend => <FriendIndexItem key={friend.id} friend={friend} fetchFriend={fetchFriend} deleteFriend={deleteFriend} />)
                    }
                </div>

            </div>
        )

    }

}

export default FriendIndex;