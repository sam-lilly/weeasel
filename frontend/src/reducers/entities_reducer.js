import { combineReducers } from 'redux';
import drawingBoardsReducer from './drawing_boards_reducer';
import allDrawingBoardsReducer from './all_drawing_boards_reducer'
import easelsReducer from './easels_reducer';
import UsersReducer from './users_reducer'
// import friendsReducer from './friends_reducer';

const entitiesReducer = combineReducers({
    drawingBoards: drawingBoardsReducer,
    allDrawingBoards: allDrawingBoardsReducer,
    easels: easelsReducer,
    users: UsersReducer
})

export default entitiesReducer;