import { connect } from 'react-redux'
import LastUpdateSeenBy from './last_update_seen_by'
import { getTicket } from '../../actions/ticket_actions'
import { withRouter } from 'react-router-dom'

const mstp = (state, ownProps) => ({
        ticketId: ownProps.match.params.ticketId,
        ticket: state.entities.tickets[ownProps.match.params.ticketId]
})

const mdtp = dispatch => ({
        getTicket: id => dispatch(getTicket(id))
})


export default withRouter(connect(mstp, mdtp)(LastUpdateSeenBy))