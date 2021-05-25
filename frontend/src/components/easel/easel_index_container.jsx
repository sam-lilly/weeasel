import  { connect } from 'react-redux';
import { fetchEasels, fetchEasel, deleteEasel } from '../../actions/easel_actions';
import EaselIndex from './easel_index';


const mSTP = (state) => ({
    easels: Object.values(state.entities.easels)
})

const mDTP = (dispatch) => ({
    fetchEasels: () => dispatch(fetchEasels()),
    fetchEasel: (easelId) => dispatch(fetchEasel(easelId)),
    deleteEasel: (easelId) => dispatch(deleteEasel(easelId))
})

export default connect (mSTP, mDTP)(EaselIndex);