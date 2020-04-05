import { RECEIVE_TAGS, RECEIVE_TAG } from '../actions/tag_actions';


const tagsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_TAGS:
      for (let i = 0; i < action.tags.length; i++) {
        nextState[action.tags[i].name] = action.tags[i];
      }
      return nextState; 
    case RECEIVE_TAG:
      nextState[action.tag.name] = action.tag;
      return nextState;      
    default:
      return state;
  }
};


export default tagsReducer;
