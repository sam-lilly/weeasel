import { RECEIVE_ALL_DRAWING_BOARDS, RECEIVE_DRAWING_BOARD } from '../actions/drawing_board_actions';

const allDrawingBoardsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  let nextState = oldState.slice();

  switch (action.type) {
    case RECEIVE_ALL_DRAWING_BOARDS:

      return action.allDrawingBoards.data;
    case RECEIVE_DRAWING_BOARD:
      // nextState[action.drawingBoard.data.id] = action.drawingBoard.data;
      nextState.push(action.drawingBoard.data)
      return nextState;
    default:
      return oldState;
  }
}

export default allDrawingBoardsReducer;