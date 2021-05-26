// import * as FriendApiUtil from '../util/friend_api_util';

// export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS"
// export const RECEIVE_FRIEND = "RECEIVE_FRIEND"
// export const REMOVE_FRIEND = "REMOVE_FRIEND"

// const receiveFriends = (friends) => ({
//     type: RECEIVE_FRIENDS,
//     friends
// })

// const receiveFriend = (friend) => ({
//     type: RECEIVE_FRIEND,
//     friend
// })

// const removeFriend = (friendId) => ({
//     type: REMOVE_FRIEND,
//     friendId
// })

// export const fetchFriends = () => (dispatch) => (
//     FriendApiUtil.fetchFriends()
//         .then(friends => dispatch(receiveFriends(friends)))
// )

// export const fetchFriend = (friendId) => (dispatch) => (
//     FriendApiUtil.fetchFriend(friendId)
//         .then(friend => dispatch(receiveFriend(friend)))
// )

// export const createEasel = (friend) => (dispatch) => (
//     FriendApiUtil.creatFriend(friend)
//         .then(friend => dispatch(receiveFriend(friend)))
// )

// export const deleteFriend = (friendId) => (dispatch) => (
//     FriendApiUtil.deleteFriend(friendId)
//         .then(() => dispatch(removeFriend(friendId)))
// )