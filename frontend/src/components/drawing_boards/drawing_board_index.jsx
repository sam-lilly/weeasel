import React from 'react';
import { Link } from 'react-router-dom';
import DrawingBoardIndexItem from './drawing_board_index_item';
import JoinedDrawingBoardsItem from './joined_drawing_boards_item'

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
      this.closeClick = this.closeClick.bind(this);

   }

   componentDidMount() {
      this.setState({ isOpen: false })
      this.props.fetchDrawingBoards();
      this.props.fetchUsers().then(this.setState());
      this.props.fetchAllDrawingBoards()
   }

   componentDidUpdate(prevProps) {

   }

   handleBoardName(e) {
      return e => {
         e.stopPropagation()
         this.setState({ name: e.currentTarget.value })
      }
   }

   createDrawingBoard(e) {
      e.preventDefault()
      this.setState({ isOpen: false, name: '' })
      this.props.createDrawingBoard(this.state).then();
   }

   toggleDropdown(e) {
      e.preventDefault();
      e.stopPropagation()
      this.setState({
         isOpen: !this.state.isOpen 
      }, document.addEventListener('click', this.closeClick))
      if (this.state.isOpen) {
         document.removeEventListener('click', this.closeClick)
      }
   }

   closeClick(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
         isOpen: false
      }, () => {
         document.removeEventListener('click', this.closeClick)
      })
   }
   

   render() {
      
      let { currentUser, friends, drawingBoards, joinedBoards, updateDrawingBoard, fetchDrawingBoard, joinDrawingBoard, leaveDrawingBoard, setDrawingBoard } = this.props;

      if (!drawingBoards) return null;

      return (
         <div className="drawing-board-index">
            <div>
               <h1 className='boards-list-title'>my drawing boards</h1>
               <div className="drawing-board-items">
                  {drawingBoards.map((board, i) =>
                     <DrawingBoardIndexItem key={i}
                        drawingBoard={board}
                        fetchDrawingBoard={fetchDrawingBoard}
                        joinDrawingBoard={joinDrawingBoard}
                        leaveDrawingBoard={leaveDrawingBoard}
                        updateDrawingBoard={updateDrawingBoard}
                        setDrawingBoard={setDrawingBoard}
                        currentUser={currentUser}
                        friends={friends}
                     />)}
               </div>
            </div>

            <div className='joined-drawing-board-index'>
               <h1 className='boards-list-title'>joined drawing boards</h1>
               <div className="drawing-board-items">
                  {joinedBoards.map((board, i) =>
                     <JoinedDrawingBoardsItem key={i}
                        drawingBoard={board}
                        setDrawingBoard={setDrawingBoard}
                        currentUser={currentUser}
                        leaveDrawingBoard={leaveDrawingBoard}
                     />)}
               </div>
            </div>




            <a onClick={this.toggleDropdown} className='create-board-btn'>
               <div className={this.state.isOpen ? "show" : "hidden"} onClick={e => e.stopPropagation()}>
                  <div className="new-baord-name-input">
                     <input type="text" className="new-board-name" placeholder="enter board name" onChange={this.handleBoardName()} value={this.state.name} />
                     <i id="create-board-name" className="fas fa-plus" onClick={this.createDrawingBoard}></i>
                  </div>
               </div>
               create a new board
            </a>
         </div >
      )
   }
}

export default DrawingBoardIndex;