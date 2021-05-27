import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_USER_SIGN_IN = 'RECEIVE_USER_SIGN_IN';
export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const RECEIVE_NEW_USER = 'RECEIVE_NEW_USER';

export const receiveCurrentUser = (currentUser) => {
  return ({
    type: RECEIVE_CURRENT_USER,
    currentUser
  });
};

export const receiveNewUser = (currentUser) => {
  return ({
    type: RECEIVE_NEW_USER,
    currentUser
  });
}

export const receiveUserSignIn = () => {
  return ({
    type: RECEIVE_USER_SIGN_IN
  });
};


export const logoutUser = () => {
  return ({
    type: RECEIVE_USER_LOGOUT
  });
};

export const receiveErrors = errors => {
  return ({
    type: RECEIVE_SESSION_ERRORS,
    errors
  })
}

export const clearErrors = () => {
  return ({
    type: CLEAR_ERRORS
  });
};

// export const signup = user => dispatch => (
//   APIUtil.signup(user)
//     .then(
//       () => (dispatch(receiveUserSignIn())),
//       err => (dispatch(receiveErrors(err.response.data)))
//     )
// );
// ^ what was written prior // below am experimenting with

// export const signup = user => dispatch => (
//   APIUtil.signup(user)
//     .then(
//       user => (dispatch(receiveNewUser(user))),
//       err => (dispatch(receiveErrors(err.response.data)))
//     )
// );
// what was working // but need to fix the state users slice
// is returning config and all info as opposed to state we want

export const signup = user => dispatch => (
  APIUtil.signup(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded))
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    })
)

export const login = user => dispatch => (
  APIUtil.login(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded))
    })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    })
)

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken')
  APIUtil.setAuthToken(false)
  dispatch(logoutUser())
};
