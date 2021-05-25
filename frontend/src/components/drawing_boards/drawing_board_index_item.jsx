import React from 'react';
import { Link } from 'react-router-dom';

class DrawingBoardIndexItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        let { drawingBoard, deleteDrawingBoard } = this.props;
        
        if (!drawingBoard) return null;


        return (
            <div className="drawing-board-index-boxes">
                <h1>hi! I am the drawing board index items :)</h1>
            </div>
        )

    }

}

export default DrawingBoardIndexItem;