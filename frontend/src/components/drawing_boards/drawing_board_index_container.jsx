import { connect } from 'react-redux';
import { fetchDrawingBoards, fetchDrawingBoard, createDrawingBoard, updateDrawingBoard, fetchAllDrawingBoards } from '../../actions/drawing_board_actions';
import { fetchUsers, joinDrawingBoard, leaveDrawingBoard } from '../../actions/user_actions'
import DrawingBoardIndex from './drawing_board_index';
import { setDrawingBoard } from '../../actions/session_actions'


const mSTP = (state) => {
    if (state.session.user) {
        let friendsArray = state.session.user.friends || [];
        let friendObjects = state.entities.users.filter(user => friendsArray.includes(user._id))
        let joinedBoardArray = state.session.user.joinedDrawingBoards || [];
        let joinedBoardsObj = []

        if (state.entities.allDrawingBoards) {
            let allBoardsArr = Object.values(state.entities.allDrawingBoards)
            joinedBoardsObj = allBoardsArr.filter(board => joinedBoardArray.includes(board._id))

        }
        return {
            friends: friendObjects,
            drawingBoards: state.entities.drawingBoards,
            users: state.entities.users,
            joinedBoards: joinedBoardsObj,
            currentUser: state.session.user
        }
    }
    else return {}
}

const mDTP = (dispatch) => ({
    fetchDrawingBoards: () => dispatch(fetchDrawingBoards()),
    fetchAllDrawingBoards: () => dispatch(fetchAllDrawingBoards()),
    fetchDrawingBoard: (userId, drawingBoardId) => dispatch(fetchDrawingBoard(userId, drawingBoardId)),
    joinDrawingBoard: (userId, drawingBoardId) => dispatch(joinDrawingBoard(userId, drawingBoardId)),
    leaveDrawingBoard: (drawingBoardId) => dispatch(leaveDrawingBoard(drawingBoardId)),
    createDrawingBoard: (drawingBoard) => dispatch(createDrawingBoard(drawingBoard)),
    fetchUsers: () => dispatch(fetchUsers()),
    setDrawingBoard: (drawingBoardId) => dispatch(setDrawingBoard(drawingBoardId)),
    updateDrawingBoard: (drawingBoard) => dispatch(updateDrawingBoard(drawingBoard))
})

export default connect(mSTP, mDTP)(DrawingBoardIndex);