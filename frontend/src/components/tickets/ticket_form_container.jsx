import { createTicket, getTicket, updateTicket } from "../../actions/ticket_actions";
import { getOrgUsers } from "../../actions/user_actions";
import { connect } from "react-redux";
import TicketForm from "./ticket_form";
import {withRouter} from "react-router-dom";
import {fetchTicketComments} from "../../actions/comment_actions"

const msp = (state, ownProps) => ({
    ticketId: ownProps.match.params.ticketId,
    ticket: state.entities.tickets[ownProps.match.params.ticketId],
    currentUser: state.entities.users[state.session._id],
    currentOrg: state.session.orgHandle,
});

const mdp = dispatch => ({
    createTicket: ticket => dispatch(createTicket(ticket)),
    getTicket: id => dispatch(getTicket(id)),
    updateTicket: ticket => dispatch(updateTicket(ticket)), 
    fetchTicketComments: id => dispatch(fetchTicketComments(id)),
    getOrgUsers: orgHandle => dispatch(getOrgUsers(orgHandle)),
});

const TicketFormContainer = withRouter(connect(msp, mdp)(TicketForm));

export default TicketFormContainer;