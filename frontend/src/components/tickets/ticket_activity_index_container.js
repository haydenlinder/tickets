import {connect} from "react-redux";
import { getTickets } from "../../actions/ticket_actions";
import { fetchTicketComments } from "../../actions/comment_actions"
import TicketActivityIndex from "./ticket_activity_index"


const mSTP = (state, ownProps) => ({
    ticket: Object.values(state.entities.tickets),
})

const mDTP = (dispatch) => ({
    getTickets: () => dispatch(getTickets()),
})

export default connect(mSTP, mDTP)(TicketActivityIndex)