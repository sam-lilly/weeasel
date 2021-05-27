import { connect } from 'react-redux';
import { fetchDrawingBoards, fetchDrawingBoard, createDrawingBoard } from '../../actions/drawing_board_actions';
import { fetchUsers, joinDrawingBoard } from '../../actions/user_actions'
import DrawingBoardIndex from './drawing_board_index';
import {setDrawingBoard} from '../../actions/session_actions'


const mSTP = (state) => ({
    friends: state.session.user.friends,
    drawingBoards: Object.values(state.entities.drawingBoards),
    users: state.entities.users
})

const mDTP = (dispatch) => ({
    fetchDrawingBoards: () => dispatch(fetchDrawingBoards()),
    fetchDrawingBoard: (drawingBoardId) => dispatch(fetchDrawingBoard(drawingBoardId)),
    joinDrawingBoard: (drawingBoardId) => dispatch(joinDrawingBoard(drawingBoardId)),
    createDrawingBoard: (drawingBoard) => dispatch(createDrawingBoard(drawingBoard)),
    fetchUsers: () => dispatch(fetchUsers()),
    setDrawingBoard: (drawingBoardId) => dispatch(setDrawingBoard(drawingBoardId))
})

export default connect(mSTP, mDTP)(DrawingBoardIndex);