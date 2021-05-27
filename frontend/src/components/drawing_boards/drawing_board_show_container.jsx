import { connect } from 'react-redux';
import { fetchDrawingBoard } from '../../actions/drawing_board_actions';
// import { createEasel } from '../../actions/easel_actions';
import DrawingBoardShow from './drawing_board_show';
import { fetchEasels, createEasel, deleteEasel, updateEasel } from '../../actions/easel_actions'

const mSTP = (state, ownProps) => ({
     easels: state.entities.easels || [],
     boardId: state.session.currentBoard,
     currentUsername: state.session.user.username
})

const mDTP = (dispatch) => ({
    // fetchDrawingBoard: (drawingBoardId) => dispatch(fetchDrawingBoard(drawingBoardId)),
    fetchEasels: (drawingBoardId) => dispatch(fetchEasels(drawingBoardId)),
    createEasel: (easel) => dispatch(createEasel(easel)),
    updateEasel: (boardId, easelId, easel) => dispatch(updateEasel(boardId, easelId, easel))
})

export default connect (mSTP, mDTP)(DrawingBoardShow);