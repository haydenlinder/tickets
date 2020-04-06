import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser, getOneUser } from '../../actions/user_actions';
import { createTicket, getTicket, updateTicket, clearTicketErrors } 
  from '../../actions/ticket_actions';
import { fetchTicketComments } from '../../actions/comment_actions';
import TicketForm from './ticket_form';


const msp = (state, ownProps) => ({
    ticketId: ownProps.match.params.ticketId,
    ticket: state.entities.tickets[ownProps.match.params.ticketId],
    currentUser: state.entities.users[state.session._id],
    errors: state.errors.tickets
});

const mdp = dispatch => ({
    getOneUser: userId => dispatch(getOneUser(userId)),
    createTicket: ticket => dispatch(createTicket(ticket)),
    getTicket: id => dispatch(getTicket(id)),
    updateTicket: ticket => dispatch(updateTicket(ticket)), 
    fetchTicketComments: id => dispatch(fetchTicketComments(id)),
    updateUser: user => dispatch(updateUser(user)),
    clearTicketErrors: () => dispatch(clearTicketErrors())
});

const TicketFormContainer = withRouter(connect(msp, mdp)(TicketForm));
export default TicketFormContainer;
