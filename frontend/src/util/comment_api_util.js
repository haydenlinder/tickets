import axios from "axios";


export const getTicketComments = (id) => {
    return axios.get(`/api/comments/tickets/${id}`)
}

export const writeComment = (comment) => {
    return axios.post("/api/comments", comment)
}

export const updateComment = (comment) => {
    return axios.patch(`api/comments/${comment.id}`, comment)
}

export const deleteComment = id => {
  return axios.delete(`/api/comments/${id}`);
};