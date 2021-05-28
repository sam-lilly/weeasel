import { RECEIVE_EASELS, RECEIVE_EASEL, REMOVE_EASEL } from '../actions/easel_actions';

const easelsReducer = (oldState = [], action) => {
    Object.freeze(oldState);
    let nextState = oldState.slice()

    switch (action.type) {
        case RECEIVE_EASELS:
            return action.easels.data;
        case RECEIVE_EASEL:
            let easel = nextState.find(easel => easel._id == action.easel.data._id)
            let index = nextState.indexOf(easel);
            // nextState.splice(index,1);
            nextState.push(action.easel.data)
            return nextState;
        case REMOVE_EASEL:
            delete nextState[action.easelId.data.easelId];
            return nextState;
        default:
            return oldState;
    }
}

export default easelsReducer;