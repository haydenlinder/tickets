import React from "react";
import ActivityIndexItem from "./ticket_activity_index_item";
import CommentIndexItem from "../comments/comment_index_item";

class TicketActivityIndex extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: undefined
        }
    }

    componentDidMount() {
        this.props.getTicket(this.props.ticketId)

        this.props.fetchTicketComments(this.props.ticketId)
        .then((res) => this.setState({comments: res.comments}))
    }

    render() {
        if(!this.state.comments || !this.props.ticket) {
            return null
        } 

        let comments = this.state.comments
        let ticket = this.props.ticket

        let commentsArr = comments.map(comment => ({
            author: comment.author,
            time: comment.createdAt,
            body: comment.body
        }));

        let ticketsArr = ticket.updatedBy.map((actor, i) => ({
            actor: ticket.updatedBy[i],
            time: ticket.updatedAt[i]
        }));

        let feed = ticketsArr.concat(commentsArr);
        let sortedFeed = feed.sort((ele1, ele2) =>
            ele1.time < ele2.time ? 1 : ele1.time > ele2.time ? -1 : 0
        );

        let feedList = sortedFeed.map((feedItem, i) => {
            return (
            <ul>
                {feedItem.body ? 
                <CommentIndexItem key={i + new Date().getTime()} comment={feedItem} />
                : 
                <ActivityIndexItem key={i + new Date().getTime()} update={feedItem} />
                }
            </ul>
            );
        });

        return <div>{feedList}</div>;
    }

};

export default TicketActivityIndex;
