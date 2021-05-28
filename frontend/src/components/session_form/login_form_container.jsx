import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login, clearErrors } from '../../actions/session_actions';
// make sure these are the correct names
import SessionForm from './session_form';

const mSTP = ({ errors }) => ({
    errors: Object.values(errors.session),
    formType: 'login',
    headerType: 'login',
    formNav: 'new to weeasel?',
    navLink: <Link to="/signup">sign up</Link>,
    navLinkInRender: "/signup",
    navText: 'create account'
});

const mDTP = (dispatch) => ({
    processForm: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    login: (user) => dispatch(login(user))
    // make sure these are the same names we are using
})

export default connect(mSTP, mDTP)(SessionForm);
