import { connect } from 'react-redux';
import { fetchEasel } from '../../actions/easel_actions';
import EaselShow from './easel_show';

const mSTP = (state, ownProps) => ({
    easel: state.entities.easels[ownProps.match.params.easelId]
})

const mDTP = (dispatch) => ({
    // fetchEasel: (easelId) => dispatch(fetchEasel(easelId))
})

export default connect(mSTP, mDTP)(EaselShow);