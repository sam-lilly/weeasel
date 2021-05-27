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
      this.props.fetchUsers().then(this.setState());
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

   handleFriend(friend) {
      let userArr = this.state.users.concat(friend);
      return e => {
         e.preventDefault()
         this.setState({ users: userArr })
      }
   }

   createDrawingBoard(e) {
      e.preventDefault()
      // this would taking in friends to add to board as arg (add later)
      this.setState({ isOpen: false })
      this.props.createDrawingBoard(this.state);
   }

   toggleDropdown(e) {
      e.stopPropagation();
      this.setState({ isOpen: true })
   }

   render() {
      let { drawingBoards, fetchDrawingBoard, joinDrawingBoard, deleteDrawingBoard } = this.props;

      if (!drawingBoards) return null;

      return (
         <div className="drawing-board-index">
            <div>
               <h1>My Drawing Boards</h1>
               <br />
               <div className="drawing-board-items">
                  {
                     drawingBoards.map((board, i) =>
                        <DrawingBoardIndexItem key={i}
                           drawingBoard={board}
                           fetchDrawingBoard={fetchDrawingBoard}
                           joinDrawingBoard={joinDrawingBoard}
                           deleteDrawingBoard={deleteDrawingBoard} />)
                  }
               </div>
            </div>

            {/* <div><p>above are the existing drawing boards you are a part of=========</p></div> */}


            {/* FIXME:drop..up....? hidden / show sytle */}
            <a onClick={this.toggleDropdown} className='create-board-btn'>
               <div className={this.state.isOpen ? "show" : "hidden"}>
                  <input type="text" className="new-board-name" placeholder="Enter Board Name" onChange={this.handleBoardName()} />
                  <button onClick={this.createDrawingBoard}> Create! </button>

                  <div className='add-friends-dropdown-container'>
                     <label htmlFor="">Add Friends
                        <section className='create-board-friends-list'>
                           {this.props.friends.map((friend, i) => {
                              return <button key={i} value={friend} onClick={this.handleFriend(friend)}>{friend}</button>
                           })}
                        </section>
                     </label>
                  </div>


               </div>
               Create a new Board!
            </a>
         </div >
      )

   }

}

export default DrawingBoardIndex;