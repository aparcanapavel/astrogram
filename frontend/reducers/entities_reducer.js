import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import imageReducer from './image_reducer';
import commentsReducer from './comments_reducer';
import likesReducer from "./like_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,//this is where the images, comments and likes will go as well
  posts: imageReducer,
  comments: commentsReducer,
  likes: likesReducer
});

export default entitiesReducer;