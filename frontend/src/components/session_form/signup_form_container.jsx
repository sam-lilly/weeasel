import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, clearErrors, login } from '../../actions/session_actions';
import SessionForm from './session_form';

const mSTP = ({ errors }) => ({
    errors: Object.values(errors.session),
    formType: 'create account',
    headerType: 'sign up',
    formNav: 'have an account?',
    navLink: <Link to="/login">login</Link>,
    navLinkInRender: "/login",
    navText: 'login'
});

const mDTP = (dispatch) => ({
    processForm: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors()),
    login: (user) => dispatch(login(user))
})

export default connect(mSTP, mDTP)(SessionForm);
