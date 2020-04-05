import { combineReducers } from 'redux';
import organizationsReducer from './organizations_reducer';
import usersReducer from './users_reducer';
import ticketsReducer from './tickets_reducer';
import tagsReducer from './tags_reducer';
import commentsReducer from './comments_reducer';
import organizationErrorsReducer from './organization_errors_reducer';


const entitiesReducer = combineReducers({
  organizations: organizationsReducer,
  users: usersReducer,
  tickets: ticketsReducer,
  tags: tagsReducer,
  comments: commentsReducer
});


export default entitiesReducer;
