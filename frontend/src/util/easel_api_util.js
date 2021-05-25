import axios from 'axios';

export const fetchEasels = () => {
    return axios.get(`/api/easels`)
};

export const fetchEasel = (easelId) => {
    return axios.get(`/api/easels/${easelId}`)
};

export const createEasel = (easel) => {
    return axios.post(`/api/easels`, easel)
};

export const updateEasel = (easel) => {
    return axios.patch(`/api/easels/${easel.id}`, easel)
}

export const deleteEasel = (easelId) => {
    return axios.delete(`/api/easels/${easelId}`)
};