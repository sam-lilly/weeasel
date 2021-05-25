import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';
// not sure of the import yet!
import Greeting from './greeting';

const mSTP = ({ session, entities: { users } }) => ({
    currentUser : users[session.id]
})

const mDTP = (dispatch) => ({
    logout: () => dispatch(logout())
})

// ^need to make sure all are set up the same way

export default connect (mSTP, mDTP)(Greeting);