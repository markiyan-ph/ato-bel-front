import * as actionTypes from './actionTypes';

export const authorizeUser = (username, password) => ({ type: actionTypes.AUTHORIZE_USER, username, password });
export const authorizeUserSuccess = (token, csrfToken) => ({
  type: actionTypes.AUTHORIZE_USER_SUCCESS,
  token,
  csrfToken,
});
export const authorizeUserFail = message => ({ type: actionTypes.AUTHORIZE_USER_FAIL, message });
export const authorizeRemoveErrorMessage = () => ({ type: actionTypes.AUTHORIZE_REMOVE_ERROR_MESSAGE });
export const refreshToken = () => ({ type: actionTypes.REFRESH_TOKEN });
export const refreshTokenFail = () => ({ type: actionTypes.REFRESH_TOKEN_FAIL });
export const unAuthorizeUser = () => ({ type: actionTypes.UNAUTHORIZE_USER });
export const unAuthorizeUserSuccess = () => ({ type: actionTypes.UNAUTHORIZE_USER_SUCCESS });
export const userPreview = () => ({ type: actionTypes.USER_PREVIEW });
export const userAdmin = () => ({ type: actionTypes.USER_ADMIN });
export const fetchUsers = () => ({ type: actionTypes.FETCH_USERS });
export const fetchUsersSuccess = usersList => ({ type: actionTypes.FETCH_USERS_SUCCESS, usersList });
export const addUser = userData => ({ type: actionTypes.ADD_USER, userData });
export const addUserSuccess = usersList => ({ type: actionTypes.ADD_USER_SUCCESS, usersList });
export const usersActionFail = message => ({ type: actionTypes.USERS_ACTION_FAIL, message });
