import { connect } from 'react-redux';
import { fetchDrawingBoard } from '../../actions/drawing_board_actions';
import { createEasel } from '../../actions/easel_actions';
import DrawingBoardShow from './drawing_board_show';

const mSTP = (state, ownProps) => ({
    drawingBoard: state.entities.drawingBoards[ownProps.match.params.drawingBoardId],
    easels: state.entities.drawingBoards[ownProps.match.params.drawingBoardId].easels
})

const mDTP = (dispatch) => ({
    fetchDrawingBoard: (drawingBoardId) => dispatch(fetchDrawingBoard(drawingBoardId)),
    createEasel: (easel) => dispatch(createEasel(easel))
})

export default connect (mSTP, mDTP)(DrawingBoardShow);