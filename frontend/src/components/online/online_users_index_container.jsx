import  { connect } from 'react-redux';
import { fetchOnlineUsers, fetchOnlineUser } from '../../actions/online_users_actions';
// need  to import the createFriend function for 'add friend' button beside the users name
import OnlineUsersIndex from './online_users_index';


const mSTP = (state) => ({
    onlineUsers: Object.values(state.entities.onlineUsers)
})

const mDTP = (dispatch) => ({
    fetchOnlineUsers: () => dispatch(fetchOnlineUsers()),
    fetchOnlineUser: (onlineUserId) => dispatch(fetchOnlineUser(onlineUserId)),
    createFriend: (friendId) => dispatch(createFriend(friendId))
})

export default connect (mSTP, mDTP)(OnlineUsersIndex);