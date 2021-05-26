import React from 'react';
import { connect } from 'react-redux';
import EaselForm from './easel_form';

class EditEaselForm extends React.Component {

    componentDidMount() {
        // this.props.fetchEasel(this.props.match.params.easelId);
    }

    render() {

        return (
            <div>

                <EaselForm
                    whatever we need to be passing in
                />
                <h1>this is the edit easel container</h1>

            </div>
        )

    }

}

const mSTP = (state, ownProps) => ({
    easel: state.entities.easels[ownProps.match.params.easelId],
    formType: "Update Easel"
})

const mDTP = (dispatch) => ({
    submitEasel: (boardId, easelId, easel) => dispatch(updateEasel(boardId, easelId, easel)),
    // fetchEasel: (easelId) => dispatch(fetchEasel(easelId)),
})

export default connect(mSTP, mDTP)(EditEaselForm);
