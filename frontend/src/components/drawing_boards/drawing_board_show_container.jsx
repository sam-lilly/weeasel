import { connect } from 'react-redux';
import { fetchDrawingBoard } from '../../actions/drawing_board_actions';
// import { createEasel } from '../../actions/easel_actions';
import DrawingBoardShow from './drawing_board_show';
import { fetchEasels, createEasel, deleteEasel, updateEasel } from '../../actions/easel_actions';
import {setDrawingBoard} from '../../actions/session_actions'

const mSTP = (state) => ({
     easels: state.entities.easels || [],
     boardId: state.session.currentBoard,
     currentUsername: state.session.user.username,
     currentBoard: state.entities.allDrawingBoards.find(db => db._id == state.session.currentBoard)
})

const mDTP = (dispatch) => ({
    // fetchDrawingBoard: (drawingBoardId) => dispatch(fetchDrawingBoard(drawingBoardId)),
    fetchEasels: (drawingBoardId) => dispatch(fetchEasels(drawingBoardId)),
    createEasel: (boardId, easel) => dispatch(createEasel(boardId, easel)),
    updateEasel: (boardId, easelId, easel) => dispatch(updateEasel(boardId, easelId, easel)),
    setDrawingBoard: (drawingBoardId) => dispatch(setDrawingBoard(drawingBoardId))
})

export default connect (mSTP, mDTP)(DrawingBoardShow);