import  { connect } from 'react-redux';
// import { fetchFriends, fetchFriend, deleteFriend } from '../../actions/friend_actions';
import FriendIndex from './friend_index';
import {addFriend, deleteFriend, fetchUsers} from '../../actions/user_actions'


const mSTP = (state) => {
    
    if (state.session.user && state.entities.users) {
        let users = state.entities.users;
        let currentUserId = state.session.user.id;
        let testUser = users.find(user => currentUserId == user._id);
        let friendsArray = testUser ? testUser.friends : [];
        let friendObjects = users.filter(user => friendsArray.includes(user._id))
        return {
            users: users,
            friends: friendObjects,
            currentUser: state.session.user
    }
}
else return {}

}


const mDTP = (dispatch) => ({
    fetchUsers: () => dispatch(fetchUsers()),
    addFriend: (friendId) => dispatch(addFriend(friendId)),
    deleteFriend: (friendId) => dispatch(deleteFriend(friendId))
})

export default connect (mSTP, mDTP)(FriendIndex);