import * as TagAPIUtil from '../util/tag_api_util';


// action type constants
export const RECEIVE_TAG = 'RECEIVE_TAG';
export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const RECEIVE_TAG_ERRORS = 'RECEIVE_TAG_ERRORS';


// action creators
const receiveTag = tag => ({
    type: RECEIVE_TAG,
    tag: tag
});

const receiveTags = tags => ({
    type: RECEIVE_TAGS,
    tags: tags
});

const receiveTagErrors = errors => ({
    type: RECEIVE_TAG_ERRORS,
    errors: errors
});


// dispatch asynchronous thunk actions
export const createTag = tag => dispatch => (
    TagAPIUtil.createTag(tag)
    .then(tag => dispatch(receiveTag(tag)))
    .catch(errors => dispatch(receiveTagErrors(errors))) 
);

export const getTags = () => dispatch => (
    TagAPIUtil.getTags()
    .then(tags => dispatch(receiveTags(tags)))
);

export const getTag = (name) => dispatch => (
    TagAPIUtil.getTag(name)
    .then(tag => dispatch(receiveTag(tag)))
    .catch(errors => dispatch(receiveTagErrors(errors)))
);
