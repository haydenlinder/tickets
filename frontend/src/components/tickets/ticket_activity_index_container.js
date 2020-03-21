import {connect} from "react-redux";
import { getTicket } from "../../actions/ticket_actions";
import TicketActivityIndex from "./ticket_activity_index"
import {withRouter} from "react-router-dom"

const mSTP = (state, ownProps) => {
    return {
    ticket: state.entities.tickets[ownProps.match.params.ticketId],
    comments: state.entities.tickets[ownProps.match.params.ticketId].comments
    }
}

const mDTP = (dispatch) => ({
    getTicket: (id) => dispatch(getTicket(id))
})

export default withRouter(connect(mSTP, mDTP)(TicketActivityIndex))