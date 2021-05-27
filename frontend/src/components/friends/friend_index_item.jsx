import React from 'react';
import { Link } from 'react-router-dom';

class FriendIndexItem extends React.Component {

    constructor(props) {
        super(props);
    }

    handleDelete(friendId) {
        return(e) => {
            this.props.deleteFriend(friendId)
        }
    }

    render () {

        let { friend, deleteFriend } = this.props;
        
        if (!friend) return null;

        return (
            <div className="friend-index-item">
                
                    <p className='friend-username'>{friend.username}</p>
                    
                    <i onClick={this.handleDelete(friend._id)} className="fas fa-minus-circle"></i>

                
            </div>
        )

    }

}

export default FriendIndexItem;