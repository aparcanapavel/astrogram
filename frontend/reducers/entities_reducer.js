import { combineReducers } from "redux";
import usersReducer from "./users_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer//this is where the images, comments and likes will go as well
});

export default entitiesReducer;