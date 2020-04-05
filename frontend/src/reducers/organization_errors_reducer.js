import { RECEIVE_ORG_ERRORS, CLEAR_ORG_ERRORS }
  from '../actions/organization_actions';


const organizationErrorsReducer = (defaultState = {}, action) => {
  Object.freeze(defaultState);

  switch (action.type) {
    case RECEIVE_ORG_ERRORS:
      return action.errors;
    case CLEAR_ORG_ERRORS:
      return {};
    default:
      return defaultState;
  }
};


export default organizationErrorsReducer;
