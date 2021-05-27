import React from 'react';
import { Link } from 'react-router-dom';

class DrawingBoardIndexItem extends React.Component {

    constructor(props) {
        super(props);
        this.joinBoard = this.joinBoard.bind(this);
    }

    joinBoard(drawingBoardId) {
        return e => {
            this.props.joinDrawingBoard(drawingBoardId)
        }
    }

    render() {
        let { drawingBoard, joinDrawingBoard, deleteDrawingBoard } = this.props;
        // debugger

        if (!drawingBoard) return null;


        return (
            <div className="drawing-board-index-boxes">
                <h1>{drawingBoard.name}</h1>
                <button onClick={this.joinBoard(drawingBoard._id)}>  Join </button>
            </div >
        )

    }

}

export default DrawingBoardIndexItem;