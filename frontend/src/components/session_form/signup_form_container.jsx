import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
// import { signup, clearErrors } from '../../actions/session_actions';
// make sure these are the correct names
import SessionForm from './session_form';

const mSTP = ({ errors }) => ({
    errors: errors.session,
    formType: 'Create Account',
    headerType: 'Register',
    formNav: 'Have an account?',
    navLink: <Link to="/login">Login</Link>,
    navLinkInRender: "/login",
    navText: 'Login'
});

const mDTP = (dispatch) => ({
    processForm: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
    // make sure these are the same names we are using
})

export default connect (mSTP, mDTP)(SessionForm);