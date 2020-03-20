import * as commentAPIUtil from "../util/comment_api_util"

export const RECEIVE_NEW_COMMENT = "RECEIVE_NEW_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT"
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"


const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

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

export const fetchTicketComments = (id) => dispatch => (
    commentAPIUtil.fetchTicketComments(id)
        .then(comments => dispatch(receiveComments(comments)))
        .catch(errors => dispatch(receiveCommentErrors(errors)))
)

export const fetchUserComments = userId => dispatch => (
  commentAPIUtil.fetchUserComments(userId)
    .then(comments => dispatch(receiveComments(comments)))
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


