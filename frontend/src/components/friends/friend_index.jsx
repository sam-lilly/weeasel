import React from 'react';
import { Link } from 'react-router-dom';
import FriendIndexItem from './friend_index_item';

class FriendIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addDropdown: false,

        }
        this.setDropdown = this.setDropdown.bind(this);
        this.closeClick = this.closeClick.bind(this);
    }
    componentDidMount() {
        this.props.fetchUsers();
    }

    onAdd(friendId) {
        return (e) => {
            this.props.addFriend(friendId);
            this.setState({
                addDropdown: false,
            })
        }
    }

    setDropdown(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            addDropdown: !this.state.addDropdown
        }, document.addEventListener('click', this.closeClick))
        if (this.state.addDropdown) {
            document.removeEventListener('click', this.closeClick)
        }
    }

    closeClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            addDropdown: false
        }, () => {
            document.removeEventListener('click', this.closeClick)
        })
    }

    render() {

        let { users, addFriend, deleteFriend, fetchUsers, friends, currentUser } = this.props;
        let otherUsers = users.filter(user => !this.props.currentUser.friends.includes(user._id) && this.props.currentUser.id != user._id)
        let onlineFriends = friends.filter(friend => friend.online);
        let offlineFriends = friends.filter(friend => !friend.online);

        const addFriendDropdown = () => {
            return (
                <div className='add-friend-dropdown'>
                {/* <div> */}
                    <h2 className='add-friend-dropdown-title'>Add new friends!</h2>
                    <div className='add-friend-list'>
                        {otherUsers.map(user => {
                            return <div key={user._id} className='add-friend-item'>
                                <p className='add-friend-username'>{user.username}</p>
                                <i onClick={this.onAdd(user._id)} className="fas fa-plus-circle"></i>
                            </div>
                        })}
                    </div>
                </div>
            )
        }


        if (Object.values(users).length < 1) {
            return (
                <p>loading your friends...</p>
            );
        }
        if (friends.length < 1) {
            return (
                <div className='no-friend'>
                    <h1> add new friends</h1>
                    <i onClick={this.setDropdown} className="fas fa-plus"></i>
                    {this.state.addDropdown ? addFriendDropdown() : null}
                </div>
            )
        }

        return (
            <div className="friend-index">

                <div className='friend-index-header'>
                    <h1 className='friend-index-title'>friends</h1>
                    <i onClick={this.setDropdown} className="fas fa-plus"></i>
                    {this.state.addDropdown ? addFriendDropdown() : null}
                </div>

                <div className="friend-items">
                    <h2 className='friend-index-subheader'>online</h2>
                    <div className="online-friends">
                        {
                            onlineFriends.length > 0 ? onlineFriends.map(friend => <FriendIndexItem key={friend._id} friend={friend} deleteFriend={deleteFriend} status="online" />) :
                                'no friends are online'
                        }
                    </div>
                </div>
                <div className="friend-items">
                    <h2 className='friend-index-subheader'>offline</h2>
                    <div className="offline-friends">
                        {
                            offlineFriends.length > 0 ? offlineFriends.map(friend => <FriendIndexItem key={friend._id} friend={friend} deleteFriend={deleteFriend} status="offline" />) :
                                'all friends are online!'
                        }
                    </div>
                </div>

            </div>
        )

    }

}

export default FriendIndex;