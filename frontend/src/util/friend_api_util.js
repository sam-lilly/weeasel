import axios from 'axios';

export const fetchFriends = () => {
    return axios.get(`/api/friends`)
};

export const fetchFriend = (friendId) => {
    return axios.get(`/api/friends/${friendId}`)
};

export const createFriend = (friend) => {
    return axios.post(`/api/friends`, friend)
};

export const deleteFriend = (friendId) => {
    return axios.delete(`/api/friends/${friendId}`)
};