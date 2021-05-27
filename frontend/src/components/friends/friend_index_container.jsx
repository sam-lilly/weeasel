import  { connect } from 'react-redux';
// import { fetchFriends, fetchFriend, deleteFriend } from '../../actions/friend_actions';
import FriendIndex from './friend_index';
import {addFriend, deleteFriend, fetchUsers} from '../../actions/user_actions'


const mSTP = (state) => {
    if (state.session.user) {
    let friendsArray = state.session.user.friends || [];
    let friendObjects = state.entities.users.filter(user => friendsArray.includes(user._id))
    return {
        users: state.entities.users,
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