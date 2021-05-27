import React from 'react';
import { Link } from 'react-router-dom';
import DrawingBoardIndexItem from './drawing_board_index_item';

class DrawingBoardIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      users: [],
      isOpen: false
    }
    this.createDrawingBoard = this.createDrawingBoard.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleBoardName = this.handleBoardName.bind(this);
    this.handleFriend = this.handleFriend.bind(this);
  }

  componentDidMount() {
    this.setState({ isOpen: false })
    this.props.fetchDrawingBoards();
    this.props.fetchUsers();
  }

  componentDidUpdate(prevProps) {
    // if new drawing board added // update
    //FIXME: fetch all again...? 
    // this.props.fetchDrawingBoards();
  }

  handleBoardName() {
    return e => {
      this.setState({ name: e.currentTarget.value })
    }
  }

  handleFriend() {
    return e => {
      this.setState({ users: this.state.users.push(e.currentTarget.value) })
    }
  }

  createDrawingBoard(e) {
    e.preventDefault()
    // this would taking in friends to add to board as arg (add later)
    this.setState({ isOpen: false })
    this.props.createDrawingBoard(this.state);
  }

  toggleDropdown() {
    this.setState({ isOpen: true })
  }

  render() {
    console.log(this.state);
    let { drawingBoards, fetchDrawingBoard, deleteDrawingBoard } = this.props;

    if (!drawingBoards) return null;

    return (
      <div className="drawing-board-index">

        <h1>hi, im the drawing board index!</h1>

        <div className="drawing-board-items">
          {
            drawingBoards.map((board, i) =>
              <DrawingBoardIndexItem key={i}
                drawingBoard={board}
                fetchDrawingBoard={fetchDrawingBoard}
                deleteDrawingBoard={deleteDrawingBoard} />)
          }
        </div>

        <div><p>above are the existing drawing boards you are a part of=========</p></div>


        {/* FIXME:drop..up....? hidden / show sytle */}
        <a onClick={this.toggleDropdown}>
          <div className={this.state.isOpen ? "show" : "hidden"}>
            <input type="text" name="new-board-name" placeholder="name board" onChange={this.handleBoardName()} />
            <label htmlFor="">Add Friends
              <section>
                {this.props.friends.map((friend, i) => {
                  return <button key={i} value={friend} onChange={this.handleFriend(friend)}>{friend}</button>
                })}
              </section>
            </label>

            <button onClick={this.createDrawingBoard}> Create! </button>
          </div>
          Create a new drawing Board!
        </a>
      </div>
    )

  }

}

export default DrawingBoardIndex;