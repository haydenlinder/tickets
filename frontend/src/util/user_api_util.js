import axios from 'axios';

export const fetchOneUser = userId => {
    return axios.get(
        `/api/users/${userId}`
    )
};

// export const fetchAllUsers = userId
export const fetchOrgUsers = orgHandle => {
    return axios.get(
        `/api/users/${orgHandle}`
    )
};

export const updateUser = user => {
    return axios.patch(
        `/api/users/${user._id}`,
        user
    )
};
