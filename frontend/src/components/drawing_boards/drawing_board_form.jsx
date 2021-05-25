import React from 'react';
import { Link } from 'react-router-dom';

class DrawingBoardForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.drawingBoard;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    handleSubmit() {
        // e.preventDefault();
        this.props.submitDrawingBoard(this.state)
    }


    render () {

        return (

            <div className="drawing-board-form">

                <h1>hi! I am the drawing board form</h1>


            </div>

        )
    }

}

export default DrawingBoardForm;