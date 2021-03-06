import * as UserAPI from '../util/user_api_util';

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

const receiveAllUsers = users => {
  return {
    type: RECEIVE_ALL_USERS,
    users
  }
}

const receiveUser = user => {

  return {
    type: RECEIVE_USER,
    user
  }
}

const receiveUserErrors = errors => {
  return {
    type:RECEIVE_USER_ERRORS,
    errors
  }
}

export const fetchUsers = (username) => dispatch => {
  return UserAPI.fetchUsers(username)
    .then(users => dispatch(receiveAllUsers(users)));
}

export const fetchUser = userId => dispatch => {
  return UserAPI.fetchUser(userId)
    .then(user => dispatch(receiveUser(user)));
}

export const updateUser = (user, formData) => dispatch => {

  return UserAPI.updateUser(user, formData)
    .then(user => dispatch(receiveUser(user)), err => dispatch(receiveUserErrors(err.responseJSON)));
}