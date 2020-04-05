import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer'
import organizationErrorsReducer from './organization_errors_reducer';
import ticketErrorsReducer from './ticket_errors_reducer';
import commentErrorsReducer from './comment_errors_reducer';
import tagErrorsReducer from './tag_errors_reducer';


const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  organizations: organizationErrorsReducer,
  tickets: ticketErrorsReducer,
  comments: commentErrorsReducer,
  tags: tagErrorsReducer,
});


export default errorsReducer;
