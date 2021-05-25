import React from 'react';

class DrawingBoardShow extends React.Component {

    componentDidMount() {
        this.props.fetchDrawingBoard(this.props.match.params.drawingBoardId);
    }

    render () {

        let { drawingBoard } = this.props;
        
        if (!drawingBoard) return null;

        return (
            <div className="drawing-board-show-page">
                <h1>I am the drawing board show page!</h1>
            </div>
        )
    }

}

export default DrawingBoardShow;