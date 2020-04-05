import { RECEIVE_COMMENT_ERRORS } from '../actions/comment_actions';


const commentErrorsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_COMMENT_ERRORS: 
      return action.errors;
    default: 
      return state; 
  }
};


export default commentErrorsReducer;
