import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import entitiesReducer from './entities_reducer';
import errorsReducer from "./errors_reducer";

const rootReducer = combineReducers({
  entities: entitiesReducer,
  //ui: { loading: false }, //is this a good idea?
  session: sessionReducer,
  errors: errorsReducer
});

export default rootReducer;