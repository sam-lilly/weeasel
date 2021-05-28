import React from 'react';

class JoinedDrawingBoardsItem extends React.Component {

  constructor(props) {
    super(props)
  }


  onClick(drawingBoardId) {
    return (e) => {
      this.props.setDrawingBoard(drawingBoardId)
    }
  }

  render() {
    let { drawingBoard, leaveDrawingBoard, setDrawingBoard } = this.props;
    return (

      <div onClick={this.onClick(drawingBoard._id)} className="boards-index-header">
        <h1 className='drawing-board-name'> {drawingBoard.name}</h1>
        <i id="left-leave-easel" onClick={() => leaveDrawingBoard(drawingBoard._id)} className="fas fa-minus-circle"></i>
      </div >
    )
  }
}

export default JoinedDrawingBoardsItem;