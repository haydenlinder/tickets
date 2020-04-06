import axios from 'axios';

export const fetchTicketComments = id => (
  axios.get(`/api/comments/tickets/${id}`)
);

export const fetchUserComments = userId => (
  axios.get(`/api/comments/author/${userId}`)
);

export const writeComment = comment => (
  axios.post(`/api/comments/`, comment)
);

export const updateComment = comment => (
  axios.patch(`api/comments/${comment._id}`, comment)
);

export const deleteComment = id => (
  axios.delete(`/api/comments/${id}`)
);
