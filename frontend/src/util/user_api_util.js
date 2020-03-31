import axios from 'axios';

export const fetchOneUser = userId => {
    return axios.get(`/api/users/${userId}`)
};

export const fetchOrgUsers = orgHandle => {
  // debugger
    return axios.get(
        `/api/users/org_users`,
        orgHandle
    );
};
