import { connect } from 'react-redux';
import { fetchDrawingBoard } from '../../actions/drawing_board_actions';
// import { createEasel } from '../../actions/easel_actions';
import DrawingBoardShow from './drawing_board_show';
import { fetchEasels, createEasel, deleteEasel } from '../../actions/easel_actions'

const mSTP = (state, ownProps) => ({
     easels: state.entities.easels,
     boardId: state.session.currentBoard
})

const mDTP = (dispatch) => ({
    // fetchDrawingBoard: (drawingBoardId) => dispatch(fetchDrawingBoard(drawingBoardId)),
    fetchEasels: (drawingBoardId) => dispatch(fetchDrawingBoard(drawingBoardId)),
    createEasel: (easel) => dispatch(createEasel(easel))
})

export default connect (mSTP, mDTP)(DrawingBoardShow);