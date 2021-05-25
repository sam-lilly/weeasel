import * as OfflineUserApiUtil from '../util/offline_user_api_util';

export const RECEIVE_OFFLINE_USERS = "RECEIVE_OFFLINE_USERS"
export const RECEIVE_OFFLINE_USER = "RECEIVE_OFFLINE_USER"

const receiveOfflineUsers = (offlineUsers) => ({
    type: RECEIVE_OFFLINE_USERS,
    offlineUsers
})

const receiveOfflineUser = (offlineUser) => ({
    type: RECEIVE_OFFLINE_USER,
    offlineUser
})

export const fetchOfflineUsers = () => (dispatch) => (
    OfflineUserApiUtil.fetchOfflineUsers()
        .then(offlineUsers => dispatch(receiveOfflineUsers(offlineUsers)))
)

export const fetchOfflineUser = (offlineUserId) => (dispatch) => (
    OfflineUserApiUtil.fetchOfflineUser(offlineUserId)
        .then(offlineUser => dispatch(receiveOfflineUser(offlineUser)))
)
