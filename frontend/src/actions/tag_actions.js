import * as tagAPIUtil from '../util/tag_api_util';

export const RECEIVE_TAG = 'RECEIVE_TAG';
export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const RECEIVE_TAG_ERRORS = 'RECEIVE_TAG_ERRORS';

const receiveTag = tag => ({
    type: RECEIVE_TAG,
    tag
})

const receiveTags = tags => ({
    type: RECEIVE_TAGS,
    tags
})

const receiveTagErrors = errors => ({
    type: RECEIVE_TAG_ERRORS,
    errors
})

export const createTag = tag => dispatch => (
    tagAPIUtil.createTag(tag)
    .then(tag => dispatch(receiveTag(tag)))
    .catch(errors => dispatch(receiveTagErrors(errors))) 
)

export const getTags = () => dispatch => (
    tagAPIUtil.getTags()
    .then(tags => dispatch(receiveTags(tags)))
)

export const getTag = (name) => dispatch => (
    tagAPIUtil.getTag(name)
    .then(tag => dispatch(receiveTag(tag)))
    .catch(errors => dispatch(receiveTagErrors(errors)))
)