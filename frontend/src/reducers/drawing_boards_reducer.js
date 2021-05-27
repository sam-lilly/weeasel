import { RECEIVE_COMMENT, RECEIVE_DRAWING_BOARDS, RECEIVE_DRAWING_BOARD, REMOVE_DRAWING_BOARD } from '../actions/drawing_board_actions';

const drawingBoardsReducer = (oldState = [], action) => {
    Object.freeze(oldState);
    let nextState = oldState.slice();

    switch (action.type) {
        case RECEIVE_DRAWING_BOARDS:
            return action.drawingBoards.data;
        case RECEIVE_DRAWING_BOARD:
            // nextState[action.drawingBoard.data.id] = action.drawingBoard.data;
            nextState.push(action.drawingBoard.data)
            return nextState;
        case REMOVE_DRAWING_BOARD:
            delete nextState[action.drawingBoardId];
            return nextState;
        case RECEIVE_COMMENT:
            const comment = action.comment;
            nextState.drawingBoards[action.comment.drawingBoardId].comments.push(comment);
            return nextState;
        default:
            return oldState;
    }
}

export default drawingBoardsReducer;