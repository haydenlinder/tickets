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
            userId: this.props.currentUser._id,
            commentId: comment._id,
            firstName: this.props.currentUser.firstName,
            lastName: this.props.currentUser.lastName,
            time: comment.createdAt,
            body: comment.body,
            ticketId: this.props.ticketId
        }));

        let ticketsArr = ticket.updatedBy.map((actor, i) => ({
            firstName: this.props.currentUser.firstName,
            lastName: this.props.currentUser.lastName,
            userId: this.props.currentUser._id,
            actor: ticket.updatedBy[i],
            time: ticket.updatedAt[i]
        }));

        let feed = ticketsArr.concat(commentsArr);
        let sortedFeed = feed.sort((ele1, ele2) =>
            ele1.time < ele2.time ? 1 : ele1.time > ele2.time ? -1 : 0
        );

        let feedList = sortedFeed.map((feedItem, i) => {
            return (
                <div>
                    <ul>
                        {feedItem.body ? 
                        <CommentIndexItem key={i + new Date().getTime()} comment={feedItem} deleteComment={this.props.deleteComment} fetchTicketComments={this.props.fetchTicketComments} ticketId={this.props.ticketId} />
                        : 
                        <ActivityIndexItem key={i + new Date().getTime()} update={feedItem} />
                        }
                    </ul>
                </div>
            );
        });

            

        return <div>{feedList}</div>;
    }

};

export default TicketActivityIndex;
