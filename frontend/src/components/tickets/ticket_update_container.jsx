import { connect } from 'react-redux'
import TicketUpdateItem from './ticket_update_item'
import { getTicket } from '../../actions/ticket_actions'
import { withRouter } from 'react-router-dom'

const mstp = (state, ownProps) => {
    return ({
        ticketId: ownProps.match.params.ticketId,
        ticket: state.entities.tickets[ownProps.match.params.ticketId]
    })
}

const mdtp = dispatch => {
    return ({
        getTicket: id => dispatch(getTicket(id))
    })
}


export default withRouter(connect(mstp, mdtp)(TicketUpdateItem))