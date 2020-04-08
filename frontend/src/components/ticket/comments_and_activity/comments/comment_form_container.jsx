import { connect } from 'react-redux';
import { createComment, clearCommentErrors} from 
'../../../../actions/comment_actions';
import { getTicket } from 
"../../../../actions/ticket_actions";
import CommentForm from './comment_form';
import { withRouter } from "react-router-dom";

const mSTP = (state, ownProps) => {
    return {
    currentUser: state.entities.users[state.session._id],
    ticketId: ownProps.match.params.ticketId,
    comments: Object.values(state.entities.comments),
    errors: state.errors.comments    
    }
}

const mDTP = dispatch => ({
    getTicket: (id) => dispatch(getTicket()),
    action: comment => dispatch(createComment(comment)),
    clearCommentErrors: () => dispatch(clearCommentErrors())
})

export default withRouter(connect(mSTP, mDTP)(CommentForm))