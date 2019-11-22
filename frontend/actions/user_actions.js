import * as UserAPI from '../util/user_api_util';

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = 'RECEIVE_USER';

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

export const fetchUsers = () => dispatch => {
  return UserAPI.fetchUsers()
    .then(users => dispatch(receiveAllUsers(users)));
}

export const fetchUser = userId => dispatch => {
  return UserAPI.fetchUser(userId)
    .then(user => dispatch(receiveUser(user)));
}

export const updateUser = (user) => dispatch => {
  return UserAPI.updateUser(user)
    .then(user => dispatch(receiveUser(user)));
}