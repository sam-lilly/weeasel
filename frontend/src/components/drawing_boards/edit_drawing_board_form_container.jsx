import React from 'react';
import { connect } from 'react-redux';
import DrawingBoardForm from './drawing_board_form';

class EditDrawingBoardForm extends React.Component {

    componentDidMount() {
        // this.props.fetchDrawingBoards(this.props.match.params.drawingBoardId);
    }

    render () {

        return (
            <div>

                <DrawingBoardForm
                    whatever we need to be passing in
                    />
                <h1>this is the edit drawing board container</h1>
            
            </div>
        )

    }

}

const mSTP = (state, ownProps) => ({
    drawingBoard: state.entities.drawingBoards[ownProps.match.params.drawingBoardId],
    formType: "Update Drawing Board"
})

const mDTP = (dispatch) => ({
    fetchDrawingBoard: (drawingBoardId) => dispatch(fetchDrawingBoard(drawingBoardId)),
    submitDrawingBoard: (drawingBoard) => dispatch(updateDrawingBoard(drawingBoard))
})

export default connect (mSTP, mDTP)(EditDrawingBoardForm);