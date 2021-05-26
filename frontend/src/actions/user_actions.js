import * as UserAPiUtil from '../util/user_api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const REMOVE_FRIEND = "REMOVE_FRIEND";
export const JOIN_DRAWINGBOARD = 'JOIN_DRAWINGBOARD'

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

const receiveFriend = (friendId) => ({
    type: RECEIVE_FRIEND,
    friendId
})

const removeFriend = (friendId) => ({
    type: REMOVE_FRIEND,
    friendId
})

const receiveJoinedDrawingboard = (drawingBoardId) => ({
    type: JOIN_DRAWINGBOARD,
    drawingBoardId
})

export const fetchUsers = () => (dispatch) => (
    UserAPiUtil.fetchUsers()
        .then(users => dispatch(receiveUsers(users)))
)

// export const fetchFriend = (friendId) => (dispatch) => (
//     FriendApiUtil.fetchFriend(friendId)
//         .then(friend => dispatch(receiveFriend(friend)))
// )

export const addFriend = (friendId) => (dispatch) => (
    UserAPiUtil.createFriend(friendId)
        .then(friendId => dispatch(receiveFriend(friendId)))
)

export const deleteFriend = (friendId) => (dispatch) => (
    UserAPiUtil.deleteFriend(friendId)
        .then(() => dispatch(removeFriend(friendId)))
)

export const joinDrawingBoard = (drawingBoardId) => dispatch => (
    UserAPiUtil.joinDrawingBoard(drawingBoardId)
    .then(drawingBoardId => dispatch(receiveJoinedDrawingboard(drawingBoardId)))
)