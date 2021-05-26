
import { RECEIVE_FRIEND, REMOVE_FRIEND, JOIN_DRAWINGBOARD, REMOVE_JOINED_DRAWINGBOARD } from '../actions/user_actions'
import { RECEIVE_DRAWING_BOARD } from '../actions/drawing_board_actions';

import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGN_IN, RECEIVE_NEW_USER } from '../actions/session_actions';


const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function (state = initialState, action) {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_NEW_USER:
      return {
        isAuthenticated: true,
        user: action.currentUser.data.data
      }

    case RECEIVE_FRIEND:
      newState.user.friends.push(action.friendId);
      return newState;

    case REMOVE_FRIEND:
      const index = newState.user.friends.indexOf(action.friendId);
      newState.user.friends.splice(index, 1);
      return newState;

    case JOIN_DRAWINGBOARD:
      newState.user.joinedDrawingBoards.push(action.drawingBoardId);
      return newState;

    case REMOVE_JOINED_DRAWINGBOARD:
      const index = newState.user.joinedDrawingBoards.indexOf(action.drawingBoardId);
      newState.user.joinedDrawingBoards.splice(index, 1);
      return newState;

    case RECEIVE_DRAWING_BOARD:
      newState.user.ownedDrawingBoards.push(action.drawingBoard.id)
      return newState;

    case RECEIVE_CURRENT_USER:
      return {
        isAuthenticated: true,
        user: action.currentUser
      }
    case RECEIVE_USER_SIGN_IN:
      return {
        isAuthenticated: true,
        user: action.currentUser.data
        // need to fix this as it isn't returning
        // same thing as RECEIVE_CURRENT_USER
      }

    default:
      return state;
  }
}
