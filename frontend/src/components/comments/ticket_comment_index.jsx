import React from 'react'
import CommentIndexItem from './comment_index_item'

class TicketCommentIndex extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidUpdate() {
        this.props.fetchTicketComments(this.props.match.params.ticketId)
    }

    render() {
        const { comments, deleteComment, updateComment } = this.props
        return(
            <ul>
                {comments.map(comment => <li><CommentIndexItem 
                    key={comment.id} 
                    comment={comment} 
                    deleteComment={deleteComment} 
                    updateComment={updateComment} 
                /></li>
                )}
            </ul>
        )
    }
}

export default TicketCommentIndex