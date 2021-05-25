import { connect } from 'react-redux';
import EaselForm from './easel_form';

const mSTP = (state) => ({
    easel: {
        // not sure what we will have as empty yet
    },
    formType: "Create Easel"

})

const mDTP = (dispatch) => ({
    submitEasel: (easel) => dispatch(createEasel(easel))
})

export default connect (mSTP, mDTP)(EaselForm);