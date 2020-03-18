import axios from 'axios'

export const getTickets = () => (
    axios.get(
        '/api/tickets'
    )
)

export const createTicket = ticket => (
    axios.post(
        '/api/tickets',
        ticket 
    )
)

export const getTicket = id => (
    axios.get(
        `/api/tickets/${id}`
    )
)

export const updateTicket = (ticket) => (
    axios.patch(
        `/api/tickets/${ticket.id}`,
        ticket
    )
)

export const getUserTickets = id => (
     axios.get(
         `/api/tickets/user/${id}`)
);
