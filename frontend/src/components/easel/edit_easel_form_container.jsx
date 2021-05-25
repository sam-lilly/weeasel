import React from 'react';
import { connect } from 'react-redux';
import EaselForm from './easel_form';

class EditEaselForm extends React.Component {

    componentDidMount() {
        // this.props.fetchEasel(this.props.match.params.easelId);
    }

    render () {

        return (
            // <EaselForm
            //     whatever we need to be passing in
            // />
            <h1>this is the edit easel container</h1>
        )

    }

}

const mSTP = (state, ownProps) => ({
    easel: state.entities.easels[ownProps.match.params.easelId],
    formType: "Update Easel"
})

const mDTP = (dispatch) => ({
    fetchEasel: (easelId) => dispatch(fetchEasel(easelId)),
    submitEasel: (easel) => dispatch(updateEasel(easel))
})

export default connect (mSTP, mDTP)(EditEaselForm);