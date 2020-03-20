import { connect } from 'react-redux'
import { createComment } from '../../actions/comment_actions'
import CommentForm from './comment_form'

// const mstp = (state, ownProps) => ({
//     ticket: state.entites.tickets[ownProps.match.params.ticketId]
// })

const mdtp = dispatch => ({
    createComment: comment => dispatch(createComment(comment))
})

export default connect(null, mdtp)(CommentForm)