import { connect } from 'react-redux';
import { fetchEasels, fetchEasel, deleteEasel } from '../../actions/easel_actions';
import EaselIndex from './easel_index';


const mSTP = (state) => ({
    drawingBoards: state.entities.drawingBoards,
    easels: state.entities.drawingBoards.easels
    // easels: Object.values(state.entities.easels)
})

const mDTP = (dispatch) => ({
    fetchEasels: (boardId) => dispatch(fetchEasels(boardId)),
    deleteEasel: (boardId, easelId) => dispatch(deleteEasel(boardId, easelId))
    // fetchEasel: (easelId) => dispatch(fetchEasel(easelId)),
})

export default connect(mSTP, mDTP)(EaselIndex);
