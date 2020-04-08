import { connect } from 'react-redux'
import TicketTable from './ticket_table'
import { withRouter } from 'react-router-dom'
import { fetchOwnerTickets, fetchCreatedTickets, getTickets, fetchSubscribedTickets, fetchStarredTickets } from '../../actions/ticket_actions'
import { updateUser, getOneUser } from '../../actions/user_actions'


const mstp = (state, ownProps) => { 
    return {
    userId: ownProps.match.params.userId,
    currentUser: state.entities.users[state.session._id]
}}

const mdtp = dispatch => ({
    getOneUser: userId => dispatch(getOneUser(userId)),
    fetchOwnerTickets: userId => dispatch(fetchOwnerTickets(userId)),
    fetchCreatedTickets: userId => dispatch(fetchCreatedTickets(userId)),
    fetchSubscribedTickets: userId => dispatch(fetchSubscribedTickets(userId)),
    fetchStarredTickets: userId => dispatch(fetchStarredTickets(userId)),
    getTickets: () => dispatch(getTickets()),
    updateUser: user => dispatch(updateUser(user))
})

export default withRouter(connect(mstp, mdtp)(TicketTable))