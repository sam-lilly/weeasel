import * as OnlineUserApiUtil from '../util/online_user_api_util';

export const RECEIVE_ONLINE_USERS = "RECEIVE_ONLINE_USERS"
export const RECEIVE_ONLINE_USER = "RECEIVE_ONLINE_USER"

const receiveOnlineUsers = (onlineUsers) => ({
    type: RECEIVE_ONLINE_USERS,
    onlineUsers
})

const receiveOnlineUser = (onlineUser) => ({
    type: RECEIVE_ONLINE_USER,
    onlineUser
})

export const fetchOnlineUsers = () => (dispatch) => (
    OnlineUserApiUtil.fetchOnlineUsers()
        .then(onlineUsers => dispatch(receiveOnlineUsers(onlineUsers)))
)

export const fetchOnlineUser = (onlineUserId) => (dispatch) => (
    OnlineUserApiUtil.fetchOnlineUser(onlineUserId)
        .then(onlineUser => dispatch(receiveOnlineUser(onlineUser)))
)
