import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mSTP = ({ errors }) => ({
    errors: Object.values(errors.session),
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
})

export default connect(mSTP, mDTP)(SessionForm);
