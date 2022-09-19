import { updateObject } from '../../tools/helpers';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuthorized: false,
  isAdmin: false
};

const authorizeUserSuccess = (state) => {
  return updateObject(state, {
    isAuthorized: true, isAdmin: true
  });
};

const unAuthorizeUserSuccess = (state) => {
  return updateObject(state, {
    isAuthorized: false, isAdmin: false
  });
};

const userPreview = (state) => {
  return updateObject(state, {
    isAdmin: false
  });
};

const userAdmin = (state) => {
  return updateObject(state, {
    isAdmin: true
  });
};

const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHORIZE_USER: return authorizeUserSuccess(state);
    case actionTypes.UNAUTHORIZE_USER: return unAuthorizeUserSuccess(state);
    case actionTypes.USER_PREVIEW: return userPreview(state);
    case actionTypes.USER_ADMIN: return userAdmin(state);
    default:
      return state;
  }
};

export default authorizationReducer;