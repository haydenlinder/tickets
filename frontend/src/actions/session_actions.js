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

export const login = user => dispatch => {
  localStorage.tutorial = true;
  return(
  SessionAPIUtil.login(user)
  .then(res => {
    const { token } = res.data;
    localStorage.tutorial = true;
    localStorage.setItem('jwtToken', token);
    SessionAPIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded))
  })
  .catch(err => {
    dispatch(receiveSessionErrors(err.response.data));
  })
  )
};

export const loginRandomUser = () => dispatch => {
  const emails = [
    "hayden@acme.org",
    "brad@acme.org",
    "marshall@acme.org",
    "joe@acme.org",
    "abbigale@acme.org",
    "bobby@acme.org",
    "carol@acme.org",
    "diane@acme.org",
    "evan@acme.org",
    "george@acme.org",
    "isaac@acme.org",
    "kyle@acme.org",
    "fred@acme.org",
    "olivia@acme.org"
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
