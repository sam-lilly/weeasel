import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

//FIXME: redirect to when user is authenticated
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (<Component {...props} />) : (<Redirect to="/myWeeasel" />))}
  />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route {...rest} render={props =>
    loggedIn ? (<Component {...props} />) : (<Redirect to="/login" />)}
  />
);

const mStP = ({ session: { isAuthenticated } }) => {
  return ({
    loggedIn: isAuthenticated
  })
}

export const AuthRoute = withRouter(connect(mStP)(Auth));
export const ProtectedRoute = withRouter(connect(mStP)(Protected));