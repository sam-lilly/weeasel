import React from 'react';
import { Link } from 'react-router-dom';

class DrawingBoardIndexItem extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         id: props.drawingBoard._id,
         users: [props.currentUser.id],
         isOpen: false
      }
      this.joinBoard = this.joinBoard.bind(this);
      this.handleFriend = this.handleFriend.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
   }

   onClick(drawingBoardId) {
      return (e) => {
         this.props.setDrawingBoard(drawingBoardId)
      }
   }

   joinBoard(drawingBoardId) {
      return e => {
         this.props.joinDrawingBoard(drawingBoardId)
      }
   }

   handleFriend(friendId, boardId) {
      let userArr = this.state.users
      if (!userArr.includes(friendId)) {
         userArr = userArr.concat(friendId);

      }

      return e => {
         e.preventDefault();
         e.stopPropagation();
         this.props.joinDrawingBoard(friendId, boardId);
         this.setState({ users: userArr })
      }
   }

   toggleDropdown(e) {
      e.stopPropagation();
      this.setState({ isOpen: true })
   }

   render() {
      let { friends, drawingBoard, updateDrawingBoard, deleteDrawingBoard } = this.props;
      // debugger

      if (!drawingBoard) return null;


      return (
         <div onClick={this.onClick(drawingBoard._id)} className="drawing-board-index-boxes">
            <h1>{drawingBoard.name}</h1>
            <a onClick={this.toggleDropdown} className='create-board-btn'>
               <div className={this.state.isOpen ? "show" : "hidden"} >
                  <div className='add-friends-dropdown-container'>
                     <section className='create-board-friends-list'>
                        {friends.map((friend, i) => {
                           return <button key={i} value={friend} onClick={this.handleFriend(friend._id, drawingBoard._id)}>{friend.username}</button>
                        })}
                     </section>
                     <button onClick={() => updateDrawingBoard(this.state)}>  Done </button>
                  </div>
               </div>
               Add Friends
            </a>
         </div >
      )

   }

}

export default DrawingBoardIndexItem;