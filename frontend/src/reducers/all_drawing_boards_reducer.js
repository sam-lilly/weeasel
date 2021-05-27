import { RECEIVE_ALL_DRAWING_BOARDS } from '../actions/drawing_board_actions';

const allDrawingBoardsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let nextState = Object.assign({}, oldState);

  switch (action.type) {
    case RECEIVE_ALL_DRAWING_BOARDS:

      return action.allDrawingBoards.data;
    default:
      return oldState;
  }
}

export default allDrawingBoardsReducer;