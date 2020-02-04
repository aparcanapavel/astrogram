import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import image_errors_reducer from "./image_errors_reducer";
import userErrorsReducer from './user_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer, 
  image: image_errors_reducer,
  user: userErrorsReducer
});

export default errorsReducer;