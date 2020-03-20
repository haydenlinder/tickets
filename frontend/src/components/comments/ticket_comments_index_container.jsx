import { connect } from 'react-redux'
import { deleteComment, fetchTicketComments } from '../../actions/comment_actions'
import CommentIndex from './ticket_comment_index'

const mSTP = (state, ownProps) => ({
    ticket: state.entities.tickets[ownProps.match.params.ticketId],
    comments: Object.values(state.entities.comments)
})

const mDTP = dispatch => ({
    deleteComment: id => dispatch(deleteComment(id)),
    fetchTicketComments: id => dispatch(fetchTicketComments(id)),
    updateComment: comment => dispatch(updateComment(comment))
})

export default connect(mSTP, mDTP)(CommentIndex)