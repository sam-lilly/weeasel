import React from 'react';
import { Link } from 'react-router-dom';
import DrawingBoardIndexItem from './drawing_board_index_item';

class DrawingBoardIndex extends React.Component {

    constructor(props) {
        super(props);
        this.createDrawingBoard = this.createDrawingBoard.bind(this);
    }


    componentDidMount() {
        // this.props.fetchDrawingBoards()
    }

    componentDidUpdate(prevProps) {
        // if new drawing board added // update
    }

    createDrawingBoard() {
        // this would taking in friends to add to board as arg (add later)
        this.props.createDrawingBoard();
    }


    render () {

        let { drawingBoards, fetchDrawingBoard, deleteDrawingBoard } = this.props;

        if (!drawingBoards) return null;

        return (
            <div className="drawing-board-index">

                <h1>hi, im the drawing board index!</h1>


                <div className="drawing-board-items">
                    {
                        drawingBoards.map(board => <DrawingBoardIndexItem key={board.id} drawingBoard={board} fetchDrawingBoard={fetchDrawingBoard} deleteDrawingBoard={deleteDrawingBoard} />)
                    }
                </div>

                <div><p>above are the existing drawing boards you are a part of</p></div>

                <button onClick={this.createDrawingBoard}>Create a new drawing Board!</button>

            </div>
        )

    }

}

export default DrawingBoardIndex;