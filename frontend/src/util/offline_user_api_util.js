import axios from 'axios';

export const fetchOfflineUsers = () => {
    return axios.get(`/api/offlineUsers`)
};

export const fetchOfflineUser = (offlineUserId) => {
    return axios.get(`/api/offlineUsers/${offlineUserId}`)
};