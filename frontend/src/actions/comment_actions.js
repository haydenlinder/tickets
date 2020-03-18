import * as commentAPIUtil from "../util/comment_api_util"

export const RECEIVE_TICKET_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_NEW_COMMENT = "RECEIVE_NEW_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT"
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";

const receiveTicketComments = (comment) => ({
    type: RECEIVE_TICKET_COMMENTS, 
    comment
})

const receiveNewComment = (comment) => ({
    type: RECEIVE_NEW_COMMENT, 
    comment 
})

const removeComment = (id) => ({
    type: DELETE_COMMENT, 
    id
})

const receiveCommentErrors = (errors) => ({
    type: RECEIVE_COMMENT_ERRORS, 
    errors
})

export const getTicketComments = (id) => dispatch => (
    commentAPIUtil.getTicketComments(id)
        .then(comments => dispatch(receiveTicketComments(comments)))
        .catch(errors => dispatch(receiveCommentErrors(errors)))
)

export const createComment = (comment) => dispatch => (
    commentAPIUtil.writeComment(comment)
        .then(newComment => dispatch(receiveNewComment(newComment)))
        .catch(errors => dispatch(receiveCommentErrors(errors)))
)

export const updateComment = (comment) => dispatch => (
    commentAPIUtil.updateComment(comment) 
        .then(newComment => dispatch(receiveNewComment(newComment)))
        .catch(errors => dispatch(receiveCommentErrors(errors)))
)

export const deleteComment = (id) => dispatch => (
    commentAPIUtil.deleteComment(id) 
        .then(() => dispatch(removeComment(id)))
        .catch((errors) => dispatch(receiveCommentErrors(errors)))
)


