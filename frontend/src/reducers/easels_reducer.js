import { RECEIVE_EASELS, RECEIVE_EASEL, REMOVE_EASEL } from '../actions/easel_actions';

const easelsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let nextState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_EASELS:
            return action.easels.data;
        case RECEIVE_EASEL:
            nextState[action.easel.data.id] = action.easel.data;
            return nextState;
        case REMOVE_EASEL:
            delete nextState[action.easelId.data.easelId];
            return nextState;
        default:
            return oldState;
    }
}

export default easelsReducer;