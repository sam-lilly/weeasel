import {RECEIVE_USERS} from '../actions/user_actions';
import { RECEIVE_FRIEND, REMOVE_FRIEND, JOIN_DRAWINGBOARD, REMOVE_JOINED_DRAWINGBOARD } from '../actions/user_actions'
const UsersReducer = (state = [], action) => {
    Object.freeze(state);
    let newState = state.slice();
    let currentUserIndex;
    switch(action.type) {
        case RECEIVE_USERS:
            return action.users.data;
        case RECEIVE_FRIEND:
            debugger;
            currentUserIndex = newState.findIndex(user => user._id == action.friendInfo.data.currentUserId);
            newState[currentUserIndex].friends.push(action.friendInfo.data.friendId);
            return newState;
        case REMOVE_FRIEND:

        default: 
            return state;
    }
}

export default UsersReducer;