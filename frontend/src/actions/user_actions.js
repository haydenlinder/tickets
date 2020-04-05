import * as UserAPIUtil from '../util/user_api_util';


// action type constants
export const RECEIVE_ONE_USER = "RECEIVE_ONE_USER";
export const RECEIVE_ORG_USERS = "RECEIVE_ORG_USERS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";


// action creators
const receiveOneUser = user => ({
    type: RECEIVE_ONE_USER,
    payload: user.data
});

const receiveOrgUsers = users => ({
    type: RECEIVE_ORG_USERS,
    payload: users.data
});

const receiveUserErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors: errors.response.data
});


// dispatch asynchronous thunk actions
export const getOneUser = userId => dispatch => (
    UserAPIUtil.fetchOneUser(userId)
    .then(user => dispatch(receiveOneUser(user)))
    .catch(errors => dispatch(receiveUserErrors(errors)))
);

export const getOrgUsers = orgHandle => dispatch => (
    UserAPIUtil.fetchOrgUsers(orgHandle)
    .then(users => dispatch(receiveOrgUsers(users)))
    .catch(errors => dispatch(receiveUserErrors(errors)))
);

export const updateUser = user => dispatch => (
    UserAPIUtil.updateUser(user)
    .then(user => dispatch(receiveOneUser(user)))
    .catch(errors => dispatch(receiveUserErrors(errors)))
);
