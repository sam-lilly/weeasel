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
         this.props.joinDrawingBoard(friendId, boardId);
         this.setState({ users: userArr})
      }
   }

   toggleDropdown(e) {
      e.stopPropagation();
      this.setState({ isOpen: !this.state.isOpen })
   }

   render() {
      let { friends, drawingBoard, updateDrawingBoard, deleteDrawingBoard } = this.props;

      if (!drawingBoard) return null;

      return (
         <div onClick={this.onClick(drawingBoard._id)} className="boards-index-header">
            {/* <div className="my-db-index-item"> */}
               <h1 className='drawing-board-name'>{drawingBoard.name}</h1>
               <h1 className="inside"><i onClick={this.toggleDropdown} className="fas fa-user-plus"></i></h1>
            {/* </div> */}

            {this.state.isOpen ?
               <div className='add-friend-dropdown board-list-nav'>
                  <h2 className='friend-index-title'> invite your friends!</h2>
                  <div className='add-friend-list'>
                     {friends.map((friend) => {
                         if (this.props.drawingBoard.users.includes(friend._id)) return;
                        return <div key={friend._id} className='add-friend-item'>
                           <p className='add-friend-username'>{friend.username}</p>
                           <i onClick={this.handleFriend(friend._id, drawingBoard._id)} className="fas fa-plus-circle"></i>
                        </div>
                     })}
                  </div>
               </div>
               : null}
         </div >
      )
   }
}

export default DrawingBoardIndexItem;