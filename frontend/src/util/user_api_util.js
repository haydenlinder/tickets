import axios from 'axios';

export const fetchOrgUsers = orgHandle => {
    return axios.get(
        `/api/users/${orgHandle}`
    )
};
