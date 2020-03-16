import { combineReducers } from "redux";
import tagErrorsReducer from './tag_errors_reducer'

const errorsReducer = combineReducers({
    tags: tagErrorsReducer
})

export default errorsReducer;