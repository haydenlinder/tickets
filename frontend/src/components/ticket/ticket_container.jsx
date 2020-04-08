import { createTicket, getTicket, updateTicket } from "../../actions/ticket_actions";
import { connect } from "react-redux";
import Ticket from "./ticket";
import {withRouter} from "react-router-dom";
import {fetchTicketComments} from "../../actions/comment_actions"
import { updateUser, getOneUser } from '../../actions/user_actions'
import { clearTicketErrors } from "../../actions/ticket_actions"

const msp = (state, ownProps) => {

    return ({
    ticketId: ownProps.match.params.ticketId,
    ticket: state.entities.tickets[ownProps.match.params.ticketId],
    currentUser: state.entities.users[state.session._id],
    errors: state.errors.tickets

    // ownerUsegirs: state.entities.users
    });
}

const mdp = dispatch => ({
    getOneUser: userId => dispatch(getOneUser(userId)),
    createTicket: ticket => dispatch(createTicket(ticket)),
    getTicket: id => dispatch(getTicket(id)),
    updateTicket: ticket => dispatch(updateTicket(ticket)), 
    fetchTicketComments: id => dispatch(fetchTicketComments(id)),
    updateUser: user => dispatch(updateUser(user)),
    clearTicketErrors: () => dispatch(clearTicketErrors())
});

const TicketFormContainer = withRouter(connect(msp, mdp)(Ticket));

export default TicketFormContainer;