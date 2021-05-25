import { combineReducers} from 'redux';
import drawingBoardsReducer from './drawing_boards_reducer';
import easelsReducer from './easels_reducer';
// import friendsReducer from './friends_reducer';

const entitiesReducer = combineReducers({
    drawingBoards: drawingBoardsReducer,
    easels: easelsReducer
})

export default entitiesReducer;