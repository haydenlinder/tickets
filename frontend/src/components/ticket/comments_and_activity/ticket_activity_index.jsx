import React from "react";
import ActivityIndexItem from "./ticket_activity_index_item";
import CommentIndexItem from "../../comments/comment_index_item";

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
            userId: comment.author._id,
            commentId: comment._id,
            firstName: comment.author.firstName,
            lastName: comment.author.lastName,
            time: comment.createdAt,
            body: comment.body,
            ticketId: this.props.ticketId
        }));

        let updatesArr = ticket.updatedBy.map((actor, i) => ({
            firstName: actor.firstName,
            lastName: actor.lastName,
            userId: actor._id,
            actor: actor,
            time: ticket.updatedAt[i],
        }));


        let feed = updatesArr.concat(commentsArr);
        let sortedFeed = feed.sort((ele1, ele2) =>
            ele1.time < ele2.time ? 1 : ele1.time > ele2.time ? -1 : 0
        );

        let feedList = sortedFeed.map((feedItem, i) => {
            return (
                <li key={i + new Date().getTime()} >
                    {feedItem.body ? 
                    <CommentIndexItem
                        currentUserId={this.props.currentUser._id}
                        comment={feedItem} 
                        deleteComment={this.props.deleteComment} 
                        ticketId={this.props.ticketId} 
                        updateComment={this.props.updateComment} 
                        errors={this.props.errors}
                    />
                    : 
                    <ActivityIndexItem update={feedItem} />
                    }
                </li>
            );
        });

        return <div>{feedList}</div>;
    }

};

export default TicketActivityIndex;
