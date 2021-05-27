import { connect } from 'react-redux';
import { logout, setDrawingBoard } from '../../actions/session_actions';
import Greeting from './greeting';

const mSTP = (state) => ({
    // currentUser: users[session.id]
    currentUser: state.session.user
    // will be this, but need to fix state
})

const mDTP = (dispatch) => ({
    logout: () => dispatch(logout()),
    setDrawingBoard: (board) => dispatch(setDrawingBoard(board))
})

// ^need to make sure all are set up the same way

// export default connect(mSTP, mDTP)(Greeting);
export default connect(mSTP, mDTP)(Greeting);