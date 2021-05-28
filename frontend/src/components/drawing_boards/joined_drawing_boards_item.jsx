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

      <div onClick={this.onClick(drawingBoard._id)} className="boards-index-item">
        <p className='friend-username'> {drawingBoard.name}</p>
        <i onClick={() => leaveDrawingBoard(drawingBoard._id)} className="fas fa-minus-circle"></i>
      </div >
    )
  }
}

export default JoinedDrawingBoardsItem;