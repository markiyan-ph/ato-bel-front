import * as actionTypes from "./actionTypes";

export const authorizeUser = () => ({ type: actionTypes.AUTHORIZE_USER });
export const authorizeUserSuccess = () => ({ type: actionTypes.AUTHORIZE_USER_SUCCESS });
export const authorizeUserFail = () => ({ type: actionTypes.AUTHORIZE_USER_FAIL });
export const unAuthorizeUser = () => ({ type: actionTypes.UNAUTHORIZE_USER });
export const unAuthorizeUserSuccess = () => ({ type: actionTypes.UNAUTHORIZE_USER_SUCCESS });
export const unAuthorizeUserFail = () => ({ type: actionTypes.UNAUTHORIZE_USER_FAIL });