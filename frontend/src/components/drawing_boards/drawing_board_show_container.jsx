import { connect } from 'react-redux';
import { fetchDrawingBoard } from '../../actions/drawing_board_actions';
import DrawingBoardShow from './drawing_board_show';

const mSTP = (state, ownProps) => ({
    drawingBoard: state.entities.drawingBoards[ownProps.match.params.drawingBoardId]
})

const mDTP = (dispatch) => ({
    fetchDrawingBoard: (drawingBoardId) => dispatch(fetchDrawingBoard(drawingBoardId))
})

export default connect (mSTP, mDTP)(DrawingBoardShow);