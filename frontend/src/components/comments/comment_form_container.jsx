import { connect } from 'react-redux'
import { createComment} from '../../actions/comment_actions'
import CommentForm from './comment_form'
import {withRouter} from "react-router-dom"
import {getTicket} from "../../util/ticket_api_util"

const mSTP = (state, ownProps) => ({
    currentUser: state.entities.users[state.session._id],
    ticketId: ownProps.match.params.ticketId,
    comments: Object.values(state.entities.comments)
})

const mDTP = dispatch => ({
    getTicket: (id) => dispatch(getTicket()),
    action: comment => dispatch(createComment(comment)),

})

export default withRouter(connect(mSTP, mDTP)(CommentForm))