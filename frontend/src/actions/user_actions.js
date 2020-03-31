import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_ONE_USER = "RECEIVE_ONE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const receiveOneUser = user => ({
    type: RECEIVE_ONE_USER,
    user: user.data
})
const receiveUsers = users => {
  // debugger
  const action = {
    type: RECEIVE_USERS,
    users: users.data
  };
  return action;
};
const receiveUserErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors: errors.response.data
})

export const getOneUser = userId => dispatch => (
    UserAPIUtil.fetchOneUser(userId)
    .then(user => dispatch(receiveOneUser(user)))
    .catch(errors => dispatch(receiveUserErrors(errors)))
);

export const getOrgUsers = orgHandle => dispatch => (
    UserAPIUtil.fetchOrgUsers(orgHandle)
    .then(users => dispatch(receiveUsers(users)))
    .catch(errors => dispatch(receiveUserErrors(errors)))
);
