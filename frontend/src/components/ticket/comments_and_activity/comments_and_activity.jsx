import React from 'react';
import TicketActivityContainer from "./activity/ticket_activity_container";
import CommentFormContainer from "./comments/comment_form_container";
import LastUpdateSeenBy from './activity/last_update_seen_by';

const CommentsAndActivity = ({ ticket, type, currentUser }) => {
    return type !== "new" ? (
        <ul className="activity-container">
            <div className="activity-header">
                <h1 className="title">Comments and activity</h1>
                <LastUpdateSeenBy ticket={ticket} />
            </div>
            <CommentFormContainer />
            <TicketActivityContainer currentUser={currentUser} />
        </ul>
    ) : null;
};

export default CommentsAndActivity;