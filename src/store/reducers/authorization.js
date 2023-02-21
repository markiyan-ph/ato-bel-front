import { updateObject } from '../../tools';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuthorized: false,
  isAdmin: false,
  accessToken: null,
  failMessage: null,
  loginScreenCode: process.env.REACT_APP_ADMIN_VIEW_KEY
};

const authorizeUser = (state) => {
  return updateObject(state, {
    failMessage: null
  });
};

const authorizeUserSuccess = (state, action) => {
  return updateObject(state, {
    isAuthorized: true, 
    isAdmin: true,
    accessToken: action.token,
    failMessage: null
  });
};

const authorizeUserFail = (state, action) => {
  return updateObject(state, {
    isAuthorized: false, 
    isAdmin: false,
    accessToken: null,
    failMessage: action.message
  });
}

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
    case actionTypes.AUTHORIZE_USER: return authorizeUser(state);
    case actionTypes.AUTHORIZE_USER_SUCCESS: return authorizeUserSuccess(state, action);
    case actionTypes.UNAUTHORIZE_USER: return unAuthorizeUserSuccess(state);
    case actionTypes.AUTHORIZE_USER_FAIL: return authorizeUserFail(state, action);
    case actionTypes.USER_PREVIEW: return userPreview(state);
    case actionTypes.USER_ADMIN: return userAdmin(state);
    default:
      return state;
  }
};

export default authorizationReducer;