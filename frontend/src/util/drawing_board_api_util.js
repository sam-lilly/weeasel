import axios from 'axios';

export const fetchDrawingBoards = () => {
    return axios.get(`/api/drawingBoards`)
};

export const fetchDrawingBoard = (drawingBoardId) => {
    return axios.get(`/api/drawingBoards/${drawingBoardId}`)
};

export const createDrawingBoard = (drawingBoard) => {
    return axios.post(`/api/drawingBoards`, drawingBoard)
};

export const updateDrawingBoard = (drawingBoard) => {
    return axios.patch(`/api/drawingBoards/${drawingBoard.id}`, drawingBoard)
}

export const deleteDrawingBoard = (drawingBoardId) => {
    return axios.delete(`/api/drawingBoards/${drawingBoardId}`)
};