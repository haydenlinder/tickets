
import * as sessionAPIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const CLEAR_ERRORS = "CLEAR_ERRORS"

export const receiveCurrentUser = payload => ({
    type: RECEIVE_CURRENT_USER,
    payload
});


export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
})

const demoUser = {
  email: "user@cats4humanity.org",
  password: "password"
};

export const signup = user => dispatch => (
    sessionAPIUtil.signup(user)
    .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        sessionAPIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    })
    .catch(err => {
        dispatch(receiveErrors(err.response.data));
    })
); 


export const login = user => dispatch => {
    sessionAPIUtil.login(user)
    .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        sessionAPIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    })
    .catch(err => {
        dispatch(receiveErrors(err.response.data));
    })
}

export const loginDemoUser = () => dispatch => {
    return dispatch(login(demoUser))
}


export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    sessionAPIUtil.setAuthToken(false)
    dispatch(logoutUser())
}