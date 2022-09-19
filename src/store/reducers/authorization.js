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

const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHORIZE_USER: return authorizeUserSuccess(state);
    case actionTypes.UNAUTHORIZE_USER: return unAuthorizeUserSuccess(state);
    default:
      return state;
  }
};

export default authorizationReducer;