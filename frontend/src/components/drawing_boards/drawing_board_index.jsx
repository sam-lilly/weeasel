import React from 'react';
import { Link } from 'react-router-dom';
import DrawingBoardIndexItem from './drawing_board_index_item';

class DrawingBoardIndex extends React.Component {

    componentDidMount() {
        this.props.fetchDrawingBoards()
    }

    render () {

        let { drawingBoards, fetchDrawingBoard, deleteDrawingBoard } = this.props;

        if (!drawingBoards) return null;

        return (
            <div className="drawing-board-index">

                <div className="drawing-board-items">
                    {
                        drawingBoards.map(board => <DrawingBoardIndexItem key={board.id} drawingBoard={board} fetchDrawingBoard={fetchDrawingBoard} deleteDrawingBoard={deleteDrawingBoard} />)
                    }
                </div>

            </div>
        )

    }

}

export default DrawingBoardIndex;