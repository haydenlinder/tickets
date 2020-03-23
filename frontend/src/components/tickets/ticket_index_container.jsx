import { connect } from 'react-redux'
import TicketIndex from './ticket_index'
import { withRouter } from 'react-router-dom'
import { fetchOwnerTickets, fetchCreatedTickets, getTickets, fetchSubscribedTickets, fetchStarredTickets } from '../../actions/ticket_actions'

const mstp = (state, ownProps) => ({
    userId: ownProps.match.params.userId,
    // ticketId: ownProps.match.params.ticketId
})

const mdtp = dispatch => ({
    fetchOwnerTickets: userId => dispatch(fetchOwnerTickets(userId)),
    fetchCreatedTickets: userId => dispatch(fetchCreatedTickets(userId)),
    fetchSubscribedTickets: userId => dispatch(fetchSubscribedTickets(userId)),
    fetchStarredTickets: userId => dispatch(fetchStarredTickets(userId)),
    getTickets: () => dispatch(getTickets())
})

export default withRouter(connect(mstp, mdtp)(TicketIndex))