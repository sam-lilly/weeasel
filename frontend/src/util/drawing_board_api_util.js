import axios from 'axios';

export const fetchDrawingBoards = () => {
    return axios.get(`/api/drawingBoards`)
};
export const fetchAllDrawingBoards = () => {
    return axios.get(`api/drawingBoards/all`)
}

export const fetchDrawingBoard = (drawingBoardId) => {
    return axios.get(`/api/drawingBoards/${drawingBoardId}`)
};

export const createDrawingBoard = (drawingBoard) => {
    return axios.post(`/api/drawingBoards`, drawingBoard)
};

export const updateDrawingBoard = (drawingBoard) => {
    // debugger
    return axios.put(`/api/drawingBoards/${drawingBoard.id}`, drawingBoard)
}

export const addComment = (drawingBoardsId, comment) => {
    return axios.post(`/api/drawingBoards/${drawingBoardsId}/comments`, comment)
}

export const deleteDrawingBoard = (drawingBoardId) => {
    return axios.delete(`/api/drawingBoards/${drawingBoardId}`)
};