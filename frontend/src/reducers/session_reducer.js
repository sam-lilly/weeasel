
import { RECEIVE_FRIEND, REMOVE_FRIEND, JOIN_DRAWINGBOARD, REMOVE_JOINED_DRAWINGBOARD } from '../actions/user_actions'
import { RECEIVE_DRAWING_BOARD } from '../actions/drawing_board_actions';

import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGN_IN, RECEIVE_NEW_USER, SET_DRAWING_BOARD } from '../actions/session_actions';


const initialState = {
  isAuthenticated: false,
  user: {},
  currentBoard: undefined
};

export default function (state = initialState, action) {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
        currentBoard: undefined
      };
    case RECEIVE_NEW_USER:
      return {
        isAuthenticated: true,
        user: action.currentUser.data.data,
        currentBoard: undefined,
      }

    case RECEIVE_FRIEND:
      newState.user.friends.push(action.friendId.data);
      return newState;

    case REMOVE_FRIEND:
      let index = newState.user.friends.indexOf(action.friendId.data);
      newState.user.friends.splice(index, 1);
      return newState;

    case JOIN_DRAWINGBOARD:
      newState.user.joinedDrawingBoards.push(action.drawingBoardId.data);
      return newState;

    case REMOVE_JOINED_DRAWINGBOARD:
      index = newState.user.joinedDrawingBoards.indexOf(action.drawingBoardId.data);
      newState.user.joinedDrawingBoards.splice(index, 1);
      return newState;

    case RECEIVE_DRAWING_BOARD:
      newState.user.ownedDrawingBoards.push(action.drawingBoard.id)
      return newState;

    case RECEIVE_CURRENT_USER:
      return {
        isAuthenticated: true,
        user: action.currentUser,
        drawingBoard: undefined
      }
    case RECEIVE_USER_SIGN_IN:
      return {
        isAuthenticated: true,
        user: action.currentUser.data,
        drawingBoard: undefined
        // need to fix this as it isn't returning
        // same thing as RECEIVE_CURRENT_USER
      }
    case SET_DRAWING_BOARD:
      newState.currentBoard = action.drawingBoardId;
      return newState;
    default:
      return state;
  }
}
