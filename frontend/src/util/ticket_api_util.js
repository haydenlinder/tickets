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

export const getCreatedTickets = userId => (
     axios.get(
         `/api/tickets/creator/${userId}`)
);


