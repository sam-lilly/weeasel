import  { connect } from 'react-redux';
import { fetchOfflineUsers, fetchOfflineUser } from '../../actions/offline_users_actions';
// need  to import the createFriend function for 'add friend' button beside the users name
import OfflineUsersIndex from './offline_users_index';


const mSTP = (state) => ({
    offlineUsers: Object.values(state.entities.offlineUsers)
})

const mDTP = (dispatch) => ({
    fetchOfflineUsers: () => dispatch(fetchOfflineUsers()),
    fetchOfflineUser: (offlineUserId) => dispatch(fetchOfflineUser(offlineUserId)),
    createFriend: (friendId) => dispatch(createFriend(friendId))
})

export default connect (mSTP, mDTP)(OfflineUsersIndex);