import axios from "axios";


export const fetchTicketComments = (id) => {
    return axios.get(`/api/comments/tickets/${id}`)
}

export const fetchUserComments = userId => {
  return axios.get(`/api/comments/author/${userId}`);
};

export const writeComment = (comment) => {
    return axios.post(`/api/comments/`, comment)
}

export const updateComment = (comment) => {
    return axios.patch(`api/comments/${comment._id}`, comment)
}

export const deleteComment = id => {
  return axios.delete(`/api/comments/${id}`);
};






