import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Greeting from './greeting';

const mSTP = (state) => ({
    // currentUser: users[session.id]
    currentUser: state.session.user
    // will be this, but need to fix state
})

const mDTP = (dispatch) => ({
    logout: () => dispatch(logout())
})

// ^need to make sure all are set up the same way

// export default connect(mSTP, mDTP)(Greeting);
export default connect(mSTP, mDTP)(Greeting);