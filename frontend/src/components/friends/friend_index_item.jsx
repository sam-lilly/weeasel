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

        let { friend, deleteFriend, status } = this.props;

        if (!friend) return null;

        return (
            // <div className={status}>
                <div className={status}>
                    <div className="on-and-off-button">
                        <i className="fas fa-circle"></i>

                        <p className='friend-username'>{friend.username}</p>
                    </div>

                    <i onClick={this.handleDelete(friend._id)} className="fas fa-minus-circle"></i>
                    {/* <i class="fas fa-minus"></i> */}
                </div>
                
            // </div>
        )

    }

}

export default FriendIndexItem;