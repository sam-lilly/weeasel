import { RECEIVE_COMMENT, RECEIVE_DRAWING_BOARDS, RECEIVE_DRAWING_BOARD, REMOVE_DRAWING_BOARD } from '../actions/drawing_board_actions';
import { JOIN_DRAWINGBOARD } from '../actions/user_actions'

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
            let deleted = nextState.filter(board => board._id != action.drawingBoardId)

            return deleted;
        case RECEIVE_COMMENT:
            const comment = action.comment;
            nextState.drawingBoards[action.comment.drawingBoardId].comments.push(comment);
            return nextState;
        case JOIN_DRAWINGBOARD:
            // console.log(action.drawingBoardId.data.joinedDrawingBoards)
            // console.log(nextState[1]._id == action.drawingBoardId.data.joinedDrawingBoards)
            let newIndex = nextState.findIndex(db => {
                // console.log(`db${db}`)
                return db._id == action.drawingBoardId.data.joinedDrawingBoards
            })
            nextState[newIndex].users.push(action.drawingBoardId.data.userId)
            return nextState;
        default:
            return oldState;
    }
}

export default drawingBoardsReducer;