import * as UserAPiUtil from '../util/user_api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const REMOVE_FRIEND = "REMOVE_FRIEND";
export const JOIN_DRAWINGBOARD = 'JOIN_DRAWINGBOARD';
export const REMOVE_JOINED_DRAWINGBOARD = 'REMOVE_JOINED_DRAWINGBOARD';

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

const receiveFriend = (friendInfo) => ({
    type: RECEIVE_FRIEND,
    friendInfo
})

const removeFriend = (friendInfo) => ({
    type: REMOVE_FRIEND,
    friendInfo
})

const receiveJoinedDrawingboard = (drawingBoardId) => ({
    type: JOIN_DRAWINGBOARD,
    drawingBoardId
})


const removeJoinedDrawingboard = (drawingBoardId) => ({
    type: REMOVE_JOINED_DRAWINGBOARD,
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
        .then(friendInfo => dispatch(receiveFriend(friendInfo)))
)

export const deleteFriend = (friendId) => (dispatch) => (
    UserAPiUtil.deleteFriend(friendId)
        .then((friendInfo) => dispatch(removeFriend(friendInfo)))
)

export const joinDrawingBoard = (userId, drawingBoardId) => dispatch => (
    UserAPiUtil.joinDrawingBoard(userId, drawingBoardId)
        .then(drawingBoardId => dispatch(receiveJoinedDrawingboard(drawingBoardId)))
)

export const leaveDrawingBoard = (drawingBoardId) => dispatch => (
    UserAPiUtil.leaveDrawingBoard(drawingBoardId)
        .then(drawingBoardId => dispatch(removeJoinedDrawingboard(drawingBoardId)))
)