import * as actionTypes from "./actionTypes";

export const authorizeUser = (username, password) => ({ type: actionTypes.AUTHORIZE_USER, username, password });
export const authorizeUserSuccess = (token) => ({ type: actionTypes.AUTHORIZE_USER_SUCCESS, token });
export const authorizeUserFail = (message) => ({ type: actionTypes.AUTHORIZE_USER_FAIL, message });
export const unAuthorizeUser = () => ({ type: actionTypes.UNAUTHORIZE_USER });
export const unAuthorizeUserSuccess = () => ({ type: actionTypes.UNAUTHORIZE_USER_SUCCESS });
export const unAuthorizeUserFail = () => ({ type: actionTypes.UNAUTHORIZE_USER_FAIL });
export const userPreview = () => ({ type: actionTypes.USER_PREVIEW });
export const userAdmin = () => ({ type: actionTypes.USER_ADMIN });