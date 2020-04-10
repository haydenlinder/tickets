import * as OrgAPIUtil from '../util/organization_api_util';


// action type constants
export const RECEIVE_ALL_ORGS = "RECEIVE_ALL_ORGS";
export const RECEIVE_ONE_ORG = "RECEIVE_ONE_ORG";
export const RECEIVE_ORG_USERS = "RECEIVE_ORG_USERS";
export const RECEIVE_ORG_ERRORS = "RECEIVE_ORG_ERRORS";
export const CLEAR_ORG_ERRORS = "CLEAR_ORG_ERRORS";


// action creators
const receiveAllOrgs = orgs => {
  let payload = {};
  orgs.data.map(org => payload[org._id] = org);
  return ({
    type: RECEIVE_ALL_ORGS,
    orgs: payload
  });
};

const receiveOneOrg = org => ({
  type: RECEIVE_ONE_ORG,
  org: org.data
});

const receiveOrgUsers = users => {
  let payload = {};
  users.data.map(user => payload[user._id] = user);
  return ({
    type: RECEIVE_ORG_USERS,
    users: payload
  });
};

const receiveOrgErrors = errors => ({
  type: RECEIVE_ORG_ERRORS,
  errors: errors.response.data
});


// dispatch asynchonous thunk actions
export const clearOrgErrors = () => ({
  type: CLEAR_ORG_ERRORS
});

export const getAllOrgs = () => dispatch => (
  OrgAPIUtil.getAllOrgs()
    .then(orgs => dispatch(receiveAllOrgs(orgs)))
    .catch(errors => dispatch(receiveOrgErrors(errors)))
);

export const getOneOrgById = orgId => dispatch => (
  OrgAPIUtil.getOneOrgById(orgId)
    .then(org => dispatch(receiveOneOrg(org)))
    .catch(errors => dispatch(receiveOrgErrors(errors)))
);

export const getOneOrgByHandle = orgHandle => dispatch => (
  OrgAPIUtil.getOneOrgByHandle(orgHandle)
    .then(org => dispatch(receiveOneOrg(org)))
    .catch(errors => dispatch(receiveOrgErrors(errors)))
);

export const getOrgUsersByHandle = orgHandle => dispatch => (
  OrgAPIUtil.getOrgUsersByHandle(orgHandle)
    .then(users => dispatch(receiveOrgUsers(users)))
    .catch(errors => dispatch(receiveOrgErrors(errors)))
);

export const getOrgUsersByHandleAndNameFragment =
  (orgHandle, nameFragment) => dispatch => {
    return (
    OrgAPIUtil.getOrgUsersByHandleAndNameFragment(orgHandle, nameFragment)
      .then(users => dispatch(receiveOrgUsers(users)))
      .catch(errors => dispatch(receiveOrgErrors(errors)))
    )
    
  };
