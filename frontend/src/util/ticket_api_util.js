import axios from 'axios';

export const getTickets = () => (
  axios.get(`/api/tickets`)
);

export const createTicket = ticket => (
  axios.post(`/api/tickets`, ticket)
);

export const getTicket = id => (
  axios.get(`/api/tickets/${id}`)
);

export const updateTicket = ticket => (
  axios.patch(`/api/tickets/${ticket._id}`, ticket)
);

export const fetchOwnerTickets = userId => (
  axios.get(`/api/tickets/owner/${userId}`)
);

export const getCreatedTickets = userId => (
  axios.get(`/api/tickets/creator/${userId}`)
);

export const getSubscribedTickets = userId => (
  axios.get(`/api/tickets/subscribed/${userId}`)
);

export const getStarredTickets = currentUser => (
  axios.get(`/api/tickets/starred/${currentUser._id}`)
);
