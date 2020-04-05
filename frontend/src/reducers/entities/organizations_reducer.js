import { RECEIVE_ALL_ORGS, RECEIVE_ONE_ORG } 
  from '../../actions/organization_actions';


const organizationsReducer = (defaultState = {}, action) => {
  Object.freeze(defaultState);
  let nextState = Object.assign({}, defaultState);

  switch (action.type) {
    case RECEIVE_ALL_ORGS:
      return action.orgs;
    case RECEIVE_ONE_ORG:
      nextState[action.org._id] = action.org;
      return nextState;
    default:
      return nextState;
  }
};


export default organizationsReducer;
