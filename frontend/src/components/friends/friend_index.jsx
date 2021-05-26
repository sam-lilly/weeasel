import React from 'react';
import { Link } from 'react-router-dom';
import FriendIndexItem from './friend_index_item';

class FriendIndex extends React.Component {

    componentDidMount() {
        // this.props.fetchFriends()
    }

    render () {

        let { friends, fetchFriend, deleteFriend } = this.props;

        // if (!friends) return null;
        // comment back in when have friends

        return (
            <div className="friend-index">

                <h1>I am the friend index!</h1>

                <div className="friend-items">
                    {/* {
                        friends.map(friend => <FriendIndexItem key={friend.id} friend={friend} fetchFriend={fetchFriend} deleteFriend={deleteFriend} />)
                    } */}
                    {/* comment back in when have friends / throws err */}
                </div>

            </div>
        )

    }

}

export default FriendIndex;