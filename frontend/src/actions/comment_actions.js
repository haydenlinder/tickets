import * as CommentAPIUtil from '../util/comment_api_util';


// action type constants
export const RECEIVE_NEW_COMMENT = "RECEIVE_NEW_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";


// action creators
const receiveComments = comments => {
    let payload = {}
    comments.data.forEach(comment => payload[comment._id] = comment)
    return({
        type: RECEIVE_COMMENTS,
        payload
    });
};

const receiveNewComment = comment => ({
    type: RECEIVE_NEW_COMMENT, 
    comment: comment.data
});

const removeComment = id => ({
    type: DELETE_COMMENT, 
    _id: id
});

const receiveCommentErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS, 
    errors: errors.response.data
});


// dispatch asynchronous thunk actions
export const fetchTicketComments = ticketId => dispatch => (
    CommentAPIUtil.fetchTicketComments(ticketId)
    .then(comments => dispatch(receiveComments(comments)))
    .catch(errors => dispatch(receiveCommentErrors(errors)))
);

export const fetchUserComments = userId => dispatch => (
    CommentAPIUtil.fetchUserComments(userId)
    .then(comments => dispatch(receiveComments(comments)))
    .catch(errors => dispatch(receiveCommentErrors(errors)))
);

export const createComment = comment => dispatch => (
    CommentAPIUtil.writeComment(comment)
    .then(newComment => dispatch(receiveNewComment(newComment)))
    .catch(errors => dispatch(receiveCommentErrors(errors)))
);

export const updateComment = comment => dispatch => (
    CommentAPIUtil.updateComment(comment) 
    .then(newComment => dispatch(receiveNewComment(newComment)))
    .catch(errors => dispatch(receiveCommentErrors(errors)))
);

export const deleteComment = id => dispatch => (
    CommentAPIUtil.deleteComment(id) 
    .then(() => dispatch(removeComment(id)))
    .catch(errors => dispatch(receiveCommentErrors(errors)))  
);
