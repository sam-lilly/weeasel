import  { connect } from 'react-redux';
import ChatIndex from './chat_index';


const mSTP = (state) => ({
    // chats: *not sure what this equals // fix this
    currentUsername: state.session.user.username,
    boardId: state.session.currentBoard,
})

const mDTP = (dispatch) => ({

})

export default connect (mSTP, mDTP)(ChatIndex);