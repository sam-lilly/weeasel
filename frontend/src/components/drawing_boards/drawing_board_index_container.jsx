import  { connect } from 'react-redux';
import { fetchDrawingBoards, fetchDrawingBoard, deleteDrawingBoard } from '../../actions/drawing_board_actions';
import DrawingBoardIndex from './drawing_board_index';


const mSTP = (state) => ({
    drawingBoards: Object.values(state.entities.drawingBoards)
})

const mDTP = (dispatch) => ({
    fetchDrawingBoards: () => dispatch(fetchDrawingBoards()),
    fetchDrawingBoard: (drawingBoardId) => dispatch(fetchDrawingBoard(drawingBoardId)),
    deleteDrawingBoard: (drawingBoardId) => dispatch(deleteDrawingBoard(drawingBoardId))
})

export default connect (mSTP, mDTP)(DrawingBoardIndex);