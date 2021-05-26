import  { connect } from 'react-redux';
import { fetchFriends, fetchFriend, deleteFriend } from '../../actions/friend_actions';
import FriendIndex from './friend_index';


const mSTP = (state) => ({
    // friends: Object.values(state.entities.friends)
})

const mDTP = (dispatch) => ({
    // fetchFriends: () => dispatch(fetchFriends()),
    fetchFriend: (friendId) => dispatch(fetchFriend(friendId)),
    deleteFriend: (friendId) => dispatch(deleteFriend(friendId))
})

export default connect (mSTP, mDTP)(FriendIndex);