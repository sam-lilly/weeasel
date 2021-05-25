import * as DrawingBoardApiUtil from '../util/drawing_board_api_util';

export const RECEIVE_DRAWING_BOARDS = "RECEIVE_DRAWING_BOARDS"
export const RECEIVE_DRAWING_BOARD = "RECEIVE_DRAWING_BOARD"
export const REMOVE_DRAWING_BOARD = "REMOVE_DRAWING_BOARD"

const receiveDrawingBoards = (drawingBoards) => ({
    type: RECEIVE_DRAWING_BOARDS,
    drawingBoards
})

const receiveDrawingBoard = (drawingBoard) => ({
    type: RECEIVE_DRAWING_BOARD,
    drawingBoard
})

const removeDrawingBoard = (drawingBoardId) => ({
    type: REMOVE_DRAWING_BOARD,
    drawingBoardId
})

export const fetchDrawingBoards = () => (dispatch) => (
    DrawingBoardApiUtil.fetchDrawingBoards()
        .then(drawingBoards => dispatch(receiveDrawingBoards(drawingBoards)))
)

export const fetchDrawingBoard = (drawingBoardId) => (dispatch) => (
    DrawingBoardApiUtil.fetchDrawingBoard(drawingBoardId)
        .then(drawingBoard => dispatch(receiveDrawingBoard(drawingBoard)))
)

export const createDrawingBoard = (drawingBoard) => (dispatch) => (
    DrawingBoardApiUtil.createDrawingBoard(drawingBoard)
        .then(drawingBoard => dispatch(receiveDrawingBoard(drawingBoard)))
)

export const updateDrawingBoard = (drawingBoard) => (dispatch) => (
    DrawingBoardApiUtil.updateDrawingBoard(drawingBoard)
        .then(drawingBoard => dispatch(receiveDrawingBoard(drawingBoard)))
)

export const deleteDrawingBoard = (drawingBoardId) => (dispatch) => (
    DrawingBoardApiUtil.deleteDrawingBoard(drawingBoardId)
        .then(() => dispatch(removeDrawingBoard(drawingBoardId)))
)