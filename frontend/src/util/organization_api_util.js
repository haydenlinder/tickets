import axios from 'axios';

export const getAllOrgs = () => (
  axios.get(`/api/organizations`)
);

export const getOneOrgById = orgId => (
  axios.get(`/api/organizations/${orgId}`)
);

export const getOneOrgByHandle = orgHandle => (
  axios.get(`/api/organizations/handle/${orgHandle}`)
);

export const getOrgUsersByHandle = orgHandle => (
  axios.get(`/api/organizations/handle/${orgHandle}/users`)
);

export const getOrgUsersByHandleAndNameFragment = (orgHandle, nameFragment) => {
  return (
  axios.get(`/api/organizations/handle/${orgHandle}/users/name/${nameFragment}`
  )
  )};
