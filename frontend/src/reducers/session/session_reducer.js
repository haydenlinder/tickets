import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGN_IN } 
  from '../../actions/session_actions';


const initialState = {
  isAuthenticated: false,
  _id: {},
  orgHandle: undefined
};


const sessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState.isAuthenticated = !!action.payload;
      nextState._id = action.payload._id;
      nextState.orgHandle = action.payload.orgHandle;
      return nextState;
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        _id: undefined,
        orgHandle: undefined
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true
      };
    default:
      return state;
  }
};


export default sessionReducer;
