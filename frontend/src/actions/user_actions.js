import * as userApiUtil from '../util/user_api_util';

export const RECEIVE_ONE_USER = "RECEIVE_ONE_USER";
export const RECEIVE_ORG_USERS = "RECEIVE_ORG_USERS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const receiveOneUser = user => ({
    type: RECEIVE_ONE_USER,
    users: user.data
})
const receiveOrgUsers = users => ({
    type: RECEIVE_ORG_USERS,
    users: users.data
});

const receiveUserErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors: errors.response.data
})

export const getOneUser ;

export const getOrgUsers = orgHandle => dispatch => (
    userApiUtil.fetchOrgUsers(orgHandle)
    .then(users => dispatch(receiveOrgUsers(users)))
    .catch(errors => dispatch(receiveUserErrors(errors)))
)
