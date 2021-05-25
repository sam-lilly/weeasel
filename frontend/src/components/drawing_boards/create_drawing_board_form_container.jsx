import { connect } from 'react-redux';
import DrawingBoardForm from './drawing_board_form';

const mSTP = (state) => ({
    drawingBoard: {
        // not sure what we will have as empty yet
    },
    formType: "Create Drawing Board"

})

const mDTP = (dispatch) => ({
    submitDrawingBoard: (drawingBoard) => dispatch(createDrawingBoard(drawingBoard))
})

export default connect (mSTP, mDTP)(DrawingBoardForm);