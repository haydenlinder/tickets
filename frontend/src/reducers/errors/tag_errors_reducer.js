import { RECEIVE_TAG_ERRORS } from '../../actions/tag_actions';


const tagErrorsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_TAG_ERRORS:
      return action.errors;      
    default:
      return state;
  }
};


export default tagErrorsReducer;
