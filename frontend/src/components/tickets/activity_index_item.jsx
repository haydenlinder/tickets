import React from "react"
import {Link} from "react-router-dom"


class ActivityIndexItem extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        const {ticket} = this.props

        timeUpdate = ticket.updatedAt.map(update => <span> {update} </span>)
        userUpdateLink = ticket.updatedBy.map(user => <Link to={`/user/${user.id}`} >{user.firstName} {user.lastName}</Link> )
        ticketComments = ticket.comments.map(comment => <p> {comment.body} </p> )
        userCommentLink = ticket.comments.author.map(user => <Link to={`/user/${user.id}`}> {user.firstName} {user.lastName} </Link>)

        return (
          <div>
            <label> Updates:
                <p> {timeUpdate} {userUpdateLink} </p>
            </label>
            <label> Comments:
                <p> {ticketComments} {userCommentLink} </p>
            </label>
          </div>
        );
    }
}


export default ActivityIndexItem