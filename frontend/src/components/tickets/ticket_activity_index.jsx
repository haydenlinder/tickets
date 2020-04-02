import React from "react";
import ActivityIndexItem from "./ticket_activity_index_item";
import CommentIndexItem from "../comments/comment_index_item";

class TicketActivityIndex extends React.Component {

    componentDidMount() {
        this.props.getTicket(this.props.ticketId)
        this.props.fetchTicketComments(this.props.ticketId)
    }

    render() {
        if(!this.props.comments || !this.props.ticket) {
            return null
        } 
        let comments = this.props.comments
        let ticket = this.props.ticket
     
        let commentsArr = comments.map(comment => ({
            userId: comment.author,
            commentId: comment._id,
            firstName: this.props.currentUser.firstName,
            lastName: this.props.currentUser.lastName,
            time: comment.createdAt,
            body: comment.body,
            ticketId: this.props.ticketId
        }));

        let ticketsArr = ticket.updatedBy.map((actor, i) => ({
            firstName: ticket.updatedBy[i].firstName,
            lastName: ticket.updatedBy[i].lastName,
            userId: ticket.updatedBy[i]._id,
            actor: ticket.updatedBy[i],
            time: ticket.updatedAt[i]
        }));

        debugger

        let feed = ticketsArr.concat(commentsArr);
        let sortedFeed = feed.sort((ele1, ele2) =>
            ele1.time < ele2.time ? 1 : ele1.time > ele2.time ? -1 : 0
        );

        let feedList = sortedFeed.map((feedItem, i) => {
            return (
                <div>
                    <ul>
                        {feedItem.body ? 
                        <CommentIndexItem key={i + new Date().getTime()} 
                            comment={feedItem} 
                            deleteComment={this.props.deleteComment} 
                            fetchTicketComments={this.props.fetchTicketComments} 
                            ticketId={this.props.ticketId} 
                            updateComment={this.props.updateComment} 
                        />
                        : 
                        <ActivityIndexItem key={i + new Date().getTime()} update={feedItem} />
                        }
                    </ul>
                </div>
            );
        });

            

        return (
          <div>
            {this.props.ticket.lastUpdateSeenBy[0].firstName}{" "}
            {this.props.ticket.lastUpdateSeenBy[0].lastName} last viewed the ticket
            {feedList}
            <div>ticket created at {this.props.ticket.createdAt}</div>
          </div>
        );
    }

};

export default TicketActivityIndex;
