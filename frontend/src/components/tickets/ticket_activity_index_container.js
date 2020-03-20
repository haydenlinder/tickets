import {connect} from "react-redux";
import { getTicket } from "../../actions/ticket_actions";
import { fetchTicketComments } from "../../actions/comment_actions"
import TicketActivityIndex from "./ticket_activity_index"


const mSTP = (state, ownProps) => ({
    ticket: state.entities.tickets[ownProps.match.params.ticketId],
    comments: Object.values(state.entities.comments)
})

const mDTP = (dispatch) => ({
    getTicket: (id) => dispatch(getTicket(id)),
    fetchTicketComments: (id) => dispatch(fetchTicketComments(id))
})

export default connect(mSTP, mDTP)(TicketActivityIndex)