import * as SessionAPIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';


// action type constants
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";


// action creators
export const receiveCurrentUser = payload => ({
  type: RECEIVE_CURRENT_USER,
  payload: payload
});

export const receiveUserLogout = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors: errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});


// dispatch asynchronous thunk actions
export const signup = user => dispatch => (
  SessionAPIUtil.signup(user)
  .then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    SessionAPIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded))
  })
  .catch(err => {
    dispatch(receiveSessionErrors(err.response.data));
  })
); 

export const login = user => dispatch => (
  SessionAPIUtil.login(user)
  .then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    SessionAPIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded))
  })
  .catch(err => {
    dispatch(receiveSessionErrors(err.response.data));
  })
);

export const loginDemoUser = () => dispatch => {
  const emails = [
    "michael@acme.org",
    "bugs@acme.org",
    "daffy@acme.org",
    "porky@acme.org",
    "speedy@acme.org",
    "sam@acme.org",
    "lola@acme.org",
    "taz@acme.org",
    "marvin@acme.org",
    "sylvester@acme.org",
    "tweety@acme.org",
    "foghorn@acme.org",
    "pepe@acme.org",
    "granny@acme.org",
    "elmer@acme.org",
    "wilee@acme.org",
    "rr@acme.org",
  ]

  const randomUser = {
    email: emails[(Math.floor(Math.random() * emails.length))],
    password: "password"
  };
  
  return dispatch(login(randomUser));
};

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  SessionAPIUtil.setAuthToken(false);
  dispatch(receiveUserLogout());
};
