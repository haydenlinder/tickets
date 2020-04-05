import { RECEIVE_COMMENTS, RECEIVE_NEW_COMMENT, DELETE_COMMENT } 
  from '../../actions/comment_actions';


const commentReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_COMMENTS: 
      return action.payload;
    case RECEIVE_NEW_COMMENT: 
      nextState[action.comment._id] = action.comment
      return nextState;
    case DELETE_COMMENT: 
      delete nextState[action._id]
      return nextState;
    default: 
      return state;
  }
};


export default commentReducer;
