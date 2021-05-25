import { RECEIVE_DRAWING_BOARDS, RECEIVE_DRAWING_BOARD, REMOVE_DRAWING_BOARD } from '../actions/drawing_board_actions';

const drawingBoardsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let nextState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_DRAWING_BOARDS:
            return action.drawingBoards;
        case RECEIVE_DRAWING_BOARD:
            nextState[action.drawingBoard.id] = action.drawingBoard;
            return nextState;
        case REMOVE_DRAWING_BOARD:
            delete nextState[action.drawingBoardId];
                return nextState;
        default:
            return oldState;
    }
}

export default drawingBoardsReducer;