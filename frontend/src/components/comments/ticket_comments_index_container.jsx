import { connect } from 'react-redux'
import { deleteComment, fetchTicketComments } from '../../actions/comment_actions'
import CommentIndexItem from './ticket_comment_index'
import {withRouter} from "react-router-dom"

const mSTP = (state, ownProps) => {
    return {
    ticket: state.entities.tickets[ownProps.match.params.ticketId],
    comments: Object.values(state.entities.comments),
    users: Object.values(state.entities.users)
    }
}

const mDTP = dispatch => {
    return{
    updateComment: comment => dispatch(updateComment(comment))
}
}
export default withRouter(connect(mSTP, mDTP))(CommentIndexItem)