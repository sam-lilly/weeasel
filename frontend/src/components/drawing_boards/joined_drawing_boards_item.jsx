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

      <div onClick={this.onClick(drawingBoard._id)}>
        {drawingBoard.name}
        <button onClick={() => leaveDrawingBoard(drawingBoard._id)}> Leave </button>
      </div>
    )
  }
}

export default JoinedDrawingBoardsItem;